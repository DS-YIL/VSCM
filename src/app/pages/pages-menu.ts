import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Registration',
    icon: 'home-outline',
    link: '/VSCM/Vendorregister',
    home: true,
  },
  {
    title: 'RFQ',
    icon: 'keypad-outline',
    expanded: false,
    children: [
      {
        title: 'RFQ List',
        link: '/VSCM/vendorquotationlist/',
        icon: 'list-outline'

      }
    ],

  },
  {
    title: 'ASN',
    icon: 'keypad-outline',
    expanded: false,
    children: [
      {
        title: 'Create ASN',
        link: '/VSCM/CreateASN/',
        icon: 'list-outline'
      },
      {
        title: 'ASN List',
        link: '/VSCM/ASNList/',
        icon: 'list-outline'
      }
    ],
  },
  //{
  //  title: 'Invoice',
  //  icon: 'keypad-outline',
  //  expanded: false,
  //  children: [
  //    {
  //      title: 'Invoices',
  //      link: '/VSCM/Invoice/',
  //      icon: 'list-outline'
  //    }
  //  ]
  //},
];
