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
        //link: ['/VSCM/vendorquotationlist',this.VendorId],
        link: '/VSCM/vendorquotationlist/',
        icon: 'list-outline'

      }
    ],

  },
  //{
  //  title: 'ASN',
  //  icon: 'keypad-outline',
  //  //link: '/VSCM/createAsn',
  //  //home: true,
  //  expanded: false,
  //  children: [
  //    {
  //      title: 'ASN',
  //      //link: ['/VSCM/vendorquotationlist',this.VendorId],
  //      link: '/VSCM/CreateASN/',
  //      icon: 'list-outline'
  //    },
  //    {
  //      title: 'ASN List',
  //      link: '/VSCM/ASN/',
  //      icon: 'list-outline'
  //    }
  //  ],
  //},
  //{
  //  title: 'Invoice',
  //  icon: 'keypad-outline',
  //  //link: '/VSCM/createAsn',
  //  //home: true,
  //  expanded: false,
  //  children: [
  //    {
  //      title: 'Invoices',
  //      link: '/VSCM/Invoice/',
  //      icon: 'list-outline'
  //    }
  //  ]
  //},
  //{
  //  title: 'ASN',
  //  icon: 'keypad-outline',
  //  expanded: false,
  //  children: [
  //    {
  //      title: 'Create ASN',
  //      icon: 'list-outline',
  //      link: '/VSCN/createAsn/'
  //    }
  //  ],
  //},



];
