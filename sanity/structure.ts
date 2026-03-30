import type { StructureResolver } from 'sanity/structure'

const singletonTypes = [
  { type: 'hjem', title: 'Forside' },
  { type: 'historie', title: 'Historie' },
  { type: 'servering', title: 'Servering' },
  { type: 'kulturformidling', title: 'Kulturformidling' },
  { type: 'restaurering', title: 'Restaurering' },
  { type: 'arkiv', title: 'Arkiv' },
  { type: 'kontakt', title: 'Kontakt' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Sider')
        .child(
          S.list()
            .title('Sider')
            .items(
              singletonTypes.map(({ type, title }) =>
                S.listItem()
                  .title(title)
                  .id(type)
                  .child(
                    S.documentTypeList(type).title(title)
                  )
              )
            )
        ),
      S.divider(),
      S.documentTypeListItem('referanse').title('Referanser'),
      S.documentTypeListItem('nyhet').title('Program / Nyheter'),
    ])
