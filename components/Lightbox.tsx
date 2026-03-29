'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function Lightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const captionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<{ src: string; alt: string; caption: string }>>([]);
  const currentRef = useRef(0);
  const touchStartRef = useRef(0);

  const show = useCallback((index: number) => {
    const items = itemsRef.current;
    currentRef.current = index;
    const item = items[index];
    if (!imgRef.current || !captionRef.current || !counterRef.current) return;

    imgRef.current.src = item.src;
    imgRef.current.alt = item.alt;
    captionRef.current.textContent = item.caption;
    captionRef.current.style.display = item.caption ? '' : 'none';
    counterRef.current.textContent = `${index + 1} / ${items.length}`;

    // Preload neighbors
    [index - 1, index + 1].forEach(i => {
      if (i >= 0 && i < items.length) {
        const preload = new Image();
        preload.src = items[i].src;
      }
    });
  }, []);

  const next = useCallback(() => {
    const items = itemsRef.current;
    if (items.length > 0) show((currentRef.current + 1) % items.length);
  }, [show]);

  const prev = useCallback(() => {
    const items = itemsRef.current;
    if (items.length > 0) show((currentRef.current - 1 + items.length) % items.length);
  }, [show]);

  useEffect(() => {
    function collectImages() {
      const collected: Array<{ src: string; alt: string; caption: string }> = [];
      document.querySelectorAll('.image-gallery .vintage-frame').forEach(frame => {
        const imgEl = frame.querySelector('img') as HTMLImageElement | null;
        const capEl = frame.querySelector('.vintage-frame-caption') as HTMLElement | null;
        if (!imgEl) return;
        const source = frame.querySelector('source[type="image/webp"]') as HTMLSourceElement | null;
        const src = source?.srcset || imgEl.src;
        collected.push({ src, alt: imgEl.alt || '', caption: capEl?.textContent || '' });
      });
      itemsRef.current = collected;
    }

    function handleFrameClick(this: HTMLElement, index: number) {
      collectImages();
      if (itemsRef.current.length === 0) return;
      show(index);
      dialogRef.current?.showModal();
    }

    const frames = document.querySelectorAll('.image-gallery .vintage-frame');
    const handlers: Array<() => void> = [];
    frames.forEach((frame, i) => {
      (frame as HTMLElement).style.cursor = 'zoom-in';
      const handler = () => handleFrameClick.call(frame as HTMLElement, i);
      frame.addEventListener('click', handler);
      handlers.push(handler);
    });

    return () => {
      frames.forEach((frame, i) => {
        frame.removeEventListener('click', handlers[i]);
      });
    };
  }, [show]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { prev(); e.preventDefault(); }
    }

    function handleBackdropClick(e: MouseEvent) {
      if (e.target === dialog) dialog!.close();
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartRef.current = e.changedTouches[0].clientX;
    }

    function handleTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - touchStartRef.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) next(); else prev();
      }
    }

    dialog.addEventListener('keydown', handleKeydown);
    dialog.addEventListener('click', handleBackdropClick);
    dialog.addEventListener('touchstart', handleTouchStart, { passive: true });
    dialog.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      dialog.removeEventListener('keydown', handleKeydown);
      dialog.removeEventListener('click', handleBackdropClick);
      dialog.removeEventListener('touchstart', handleTouchStart);
      dialog.removeEventListener('touchend', handleTouchEnd);
    };
  }, [next, prev]);

  return (
    <dialog className="lightbox" id="lightbox" ref={dialogRef} aria-label="Bildegalleri">
      <button className="lightbox-close" aria-label="Lukk" type="button" onClick={() => dialogRef.current?.close()}>&times;</button>
      <button className="lightbox-prev" aria-label="Forrige bilde" type="button" onClick={prev}>&#8249;</button>
      <button className="lightbox-next" aria-label="Neste bilde" type="button" onClick={next}>&#8250;</button>
      <figure className="lightbox-figure">
        <img className="lightbox-img" ref={imgRef} src="" alt="" />
        <figcaption className="lightbox-caption" ref={captionRef as React.RefObject<HTMLElement>} />
      </figure>
      <div className="lightbox-counter" ref={counterRef} />
    </dialog>
  );
}
