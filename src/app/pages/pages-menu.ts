import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/VSCM/Dashboard',
  //   home: true,
  // },
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
  {
    title: 'ASN',
    icon: 'keypad-outline',
    //link: '/VSCM/createAsn',
    //home: true,
    expanded: false,
    children: [
      {
        title: 'ASN',
        //link: ['/VSCM/vendorquotationlist',this.VendorId],
        link: '/VSCM/CreateASN/',
        icon: 'list-outline'
      },
      {
        title: 'ASN List',
        link: '/VSCM/ASN/',
        icon: 'list-outline'
      }
    ],
  },
  {
    title: 'Invoice',
    icon: 'keypad-outline',
    //link: '/VSCM/createAsn',
    //home: true,
    expanded: false,
    children: [
      {
        title: 'Invoices',
        link: '/VSCM/Invoice/',
        icon: 'list-outline'
      }
    ]
  },
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


  // {
  //   title: 'Masters',
  //   icon: 'people-outline',
  //   expanded: false,
  //   children: [
  //     {
  //       title: 'Approver',
  //       link: '/VSCM/Approvers',
  //       icon:'person-done-outline'
  //     },
  //     {
  //       title: 'Buyer',
  //       link: '/VSCM/Buyers',
  //       icon:'shopping-bag-outline'
  //     },
  //     {
  //       title: 'Department',
  //       link: '/VSCM/Departments',
  //       icon:'list-outline'
  //     },
  //     {
  //       title: 'Scope',
  //       link: '/VSCM/Scopes',
  //       icon:'list-outline'
  //     },
  //     {
  //       title: 'Procurement Source',
  //       link: '/VSCM/ProcurementSource',
  //       icon:'list-outline'
  //     },
  //     {
  //       title: 'Project Manager',
  //       link: '/VSCM/ProjectManager',
  //       icon: 'list-outline'
  //     }

  //   ],


  // },

  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   expanded: false,
  //   children: [
  //     {
  //       title: 'Access Group',
  //       link: '/VSCM/Configuration',
  //       icon:'layers-outline'
  //     },
  //     {
  //       title: 'Access Name',
  //       link: '/VSCM/Groupaccessibility',
  //       icon:'layers-outline'
  //     },
  //     {
  //       title: 'Authorization Group',
  //       link: '/VSCM/Roleaccessibility',
  //       icon:'people-outline'
  //     },
  //     {
  //       title: 'Authorization Item',
  //       link: '/VSCM/Authorizationitem',
  //       icon:'layers-outline'
  //     }

  //   ],


  // },

];
