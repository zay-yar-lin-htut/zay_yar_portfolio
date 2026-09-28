import { icons } from './icons'

export const contactIcons = {
  github: icons.github,
  mail: 'M3 5h18v14H3V5Zm1 1 8 6 8-6',
  phone: 'M6.6 2.9 9 2.3l1.5 4.4-2 1.5a15.6 15.6 0 0 0 7.3 7.3l1.5-2 4.4 1.5-.6 2.4a2.4 2.4 0 0 1-2.7 1.8C10.6 18 6 13.4 4.8 7.6A2.4 2.4 0 0 1 6.6 2.9Z',
  location: 'M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Zm0-9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z',
  linkedin: 'M5 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 10h4v11H3V10Zm6 0h3.8v1.5h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21H9V10Z',
  facebook: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z',
  twitter: 'M21 6.2c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.7.4-1.5.7-2.4.9A3.7 3.7 0 0 0 11.7 8c0 .3 0 .6.1.8a10.5 10.5 0 0 1-7.6-3.9 3.7 3.7 0 0 0 1.1 5 3.7 3.7 0 0 1-1.7-.5v.1c0 1.8 1.3 3.3 3.1 3.7-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.6 3.5 2.6A7.4 7.4 0 0 1 3 17.3 10.4 10.4 0 0 0 8.7 19c6.8 0 10.5-5.6 10.5-10.5v-.5c.7-.5 1.3-1.1 1.8-1.8Z',
  reddit: 'M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z'
} as const

export const contactChannels = [
  { id: 'email', icon: 'mail', label: 'contact.channels.email', value: 'yaza9036@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=yaza9036@gmail.com', external: true },
  { id: 'phone-1', icon: 'phone', label: 'contact.channels.phone', value: '+959 973944946', href: 'tel:+959973944946', external: false },
  { id: 'phone-2', icon: 'phone', label: 'contact.channels.phone', value: '+959 767520288', href: 'tel:+959767520288', external: false },
  { id: 'location', icon: 'location', label: 'contact.channels.location', value: 'Yangon, Myanmar', href: 'https://maps.app.goo.gl/TYkxLRSmYVxAEXKG7', external: true },
  { id: 'github', icon: 'github', label: 'contact.channels.github', value: 'Zay Yar Lin Htut', href: 'https://github.com/zay-yar-lin-htut', external: true },
  { id: 'linkedin', icon: 'linkedin', label: 'contact.channels.linkedin', value: 'Zay Yar Lin Htut', href: 'https://www.linkedin.com/in/zay-yar-lin-htut-290785326', external: true },
  { id: 'facebook', icon: 'facebook', label: 'contact.channels.facebook', value: 'Zay Yar Lin Htut', href: 'https://www.facebook.com/linn34thant.maung', external: true },
  { id: 'twitter', icon: 'twitter', label: 'contact.channels.twitter', value: 'Zay Yar Lin Htut', href: 'https://x.com/ZaYa05787606', external: true },
  { id: 'reddit', icon: 'reddit', label: 'contact.channels.reddit', value: 'Ronim Hertz', href: 'https://www.reddit.com/user/ZAWwanaHTOO', external: true }
] as const
