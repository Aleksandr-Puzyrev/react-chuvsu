export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Инф. безопасность",
    description: "Информационная безопасность. Шифры.",
    navItems: [
      {
        label: "Главная",
        href: "/",
      },
      {
        label: "Шифр Цезаря",
        href: "/caesar",
      },
      {
        label: "Шифр Виженера",
        href: "/vigenere",
      },
      {
        label: "Шифр Тритемиуса",
        href: "/tritemius",
      },
      {
        label: "Шифр гаммирования",
        href: "/gamma",
      },
    ],
}