import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Registration',
    icon: 'home-outline',
    link: '/VSCM/Vendorregister',
    home: false,
  },
  {
    title: 'RFQ',
    icon: 'keypad-outline',
    expanded: true,
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
  {
    title: 'BG',
    icon: 'lock-outline',
    expanded: false,
    children: [
      {
        title: 'BG List',
        link: '/VSCM/BGList',
        icon: 'list-outline'
      },
    ],
  },
  {
    title: 'Guidelines',
    icon: 'lock-outline',
    expanded: false,
    children: [
      {
        title: 'Yokogawa General T&C',
        url: 'http://vscm-1089815394.ap-south-1.elb.amazonaws.com/VSCMDocs/YokogawaTermsandConditions.pdf',
        target: "true",
        icon: 'list-outline'
      },
      {
        title: 'Yokogawa  Guidelines',
        url: 'http://vscm-1089815394.ap-south-1.elb.amazonaws.com/VSCMDocs/Yokogawaguidelines.pdf',
        target: "true",
        icon: 'list-outline'
      },
    ],
  }
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
