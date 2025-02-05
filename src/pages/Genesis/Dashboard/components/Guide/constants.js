export const steps = [
  {
    target: '#welcome', // Welcome message element
    content:
      'Welcome to our platform! Here, you can easily navigate through different sections and get started with the features available.',
    disableBeacon: true, // Disable the entry beacon to make the intro more smooth
    placement: 'right',
  },
  {
    target: '#home-icon', // Icon to navigate to the home page
    content:
      'Click here to return to the homepage and start fresh. You can always access this from any section.',
    placement: 'bottom',
  },
  {
    target: '#dashboard', // Link to navigate to the "Dashboard" section
    content:
      'Click here to access the dashboard, where you can view key statistics and the latest updates. This section provides you with an overview of your activities, performance, and news to keep you informed and help you stay on track with your goals.',
    placement: 'right',
  },
  {
    target: '#purchase-link', // Link to navigate to the "Purchase" section
    content:
      'Click here to explore our available products and make a purchase. We’ve designed this section to help you find what you need quickly.',
    placement: 'right',
  },
  {
    target: '#instances-link',
    content:
      'Click here to view instances related to your purchases. This section helps you track the progress or status of your orders.',
    placement: 'right',
  },
  {
    target: '#orders-link', // Link to navigate to the "Orders" section
    content:
      'Click here to view your past orders. You can check your order history and manage existing orders from this section.',
    placement: 'right',
  },

  {
    target: '#notifications-icon', // Icon to open the notifications modal
    content:
      'Click here to open your notifications. Stay up-to-date with the latest updates and alerts related to your account.',
    placement: 'bottomLeft',
  },

  {
    target: '#profile-menu-icon', // Icon to open the profile menu
    content:
      'Click here to access your profile and settings. From here, you can manage your personal information, preferences, change from lessee to lessor, and more.',
    placement: 'left',
    disableBeacon: true,
  },
  // {
  //   target: '#user-mode', // Icon to switch between lessor and lessee
  //   content:
  //     'Click here to switch between the lessor and lessee modes. This allows you to change the view and access the options relevant to each role.',
  //   placement: 'left',
  //   callback: () => {
  //     setModalOpen(true);
  //   },
  // },
];
export const stepsMobile = [
  {
    target: '#welcome-android', // Welcome message element
    content:
      'Welcome to our platform! Here, you can easily navigate through different sections and get started with the features available.',
    disableBeacon: true, // Disable the entry beacon to make the intro more smooth
    placement: 'right',
  },

  {
    target: '#menu-icon', // Icon to open the navigation menu
    content:
      'Click here to open the navigation menu. From here, you can explore different sections of the platform, like Dashboard, Purchases, Orders, and more. Use this menu to navigate seamlessly.',
    placement: 'bottom',
  },
  {
    target: '#notifications-icon', // Icon to open the notifications modal
    content:
      'Click here to open your notifications. Stay up-to-date with the latest updates and alerts related to your account.',
    placement: 'left',
  },
  {
    target: '#profile-menu-icon', // Icon to open the profile menu
    content:
      'Click here to access your profile and settings. From here, you can manage your personal information, preferences, change from lessee to lessor, and more.',
    placement: 'left',
  },
];
export const customStyles = {
  options: {
    backgroundColor: '#2c3e50',
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    primaryColor: '#3498db',
    textColor: '#ecf0f1',
    width: 400,
    zIndex: 99999,
    marginLeft: '20px',
  },
  beacon: {
    inner: {
      backgroundColor: '#ff4081', // Color del círculo que resalta los elementos
    },
    outer: {
      backgroundColor: 'rgba(255, 64, 129, 0.3)', // Color del borde del círculo
    },
  },
  buttonClose: {
    display: 'none',
    backgroundColor: '#e74c3c',
    color: '#ecf0f1',
  },
  buttonBack: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  buttonNext: {
    backgroundColor:
      'linear-gradient(275.81deg,rgb(36, 193, 241) 18.68%,rgb(74, 118, 250) 100%);',
    color: '#000',
  },
};
