export const stepsLesse = [
  {
    target: '#welcome', // Welcome message element
    content:
      'Welcome to our platform (Lessee Mode)! Here, you can easily navigate through different sections and get started with the features available.',
    disableBeacon: true, // Disable the entry beacon to make the intro more smooth
    placement: 'center',
  },
  {
    target: '#home-icon', // Icon to navigate to the home page
    content:
      'Click here to return to the homepage and start fresh. You can always access this from any section.',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '#notifications-icon', // Icon to open the notifications modal
    content:
      'Click here to open your notifications. Stay up-to-date with the latest updates and alerts related to your account.',
    placement: 'bottomLeft',
    disableBeacon: true,
  },
  {
    target: '#notifications-modal', // Icon to open the notifications modal
    content: 'Here you can see all your messages and notifications',
    placement: 'bottomLeft',
    disableBeacon: true,
  },

  {
    target: '#dashboard', // Link to navigate to the "Dashboard" section
    content:
      'Click here to access the dashboard, where you can view key statistics and the latest updates. This section provides you with an overview of your activities, performance, and news to keep you informed and help you stay on track with your goals.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#purchase-link', // Link to navigate to the "Purchase" section
    content:
      'Click here to explore our available products and make a purchase. We’ve designed this section to help you find what you need quickly.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#instances-link',
    content:
      'Click here to view instances related to your purchases. This section helps you track the progress or status of your orders.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#orders-link', // Link to navigate to the "Orders" section
    content:
      'Click here to view your past orders. You can check your order history and manage existing orders from this section.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#profile-menu-icon', // Icon to open the profile menu
    content:
      'Click here to access your profile and settings. From here, you can manage your personal information, preferences, change from lessee to lessor, and more.',
    placement: 'left',
    disableBeacon: true,
  },
  {
    target: '#user-mode', // Icon to switch between Lessee and Lessor modes
    content:
      'Click here to switch between Lessee mode and Lessor mode, depending on your role.',
    placement: 'bottom', // Message placed just below the icon
    disableBeacon: true,
  },
];
export const setpsLessor = [
  {
    target: '#welcome', // Welcome message element
    content:
      'Welcome to our platform (Lessor Mode)! Here, you can easily navigate through different sections and get started with the features available.',
    disableBeacon: true, // Disable the entry beacon to make the intro more smooth
    placement: 'center',
  },
  {
    target: '#dashboard', // Link to navigate to the "Dashboard" section
    content:
      'Click here to access the dashboard, where you can view key statistics and the latest updates. This section provides you with an overview of your activities, performance, and news to keep you informed and help you stay on track with your goals.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#deployNode',
    content:
      'Here you can purchase NFTs and deploy your nodes on the network. Make sure to review the details before confirming.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#nodes',
    content:
      'Here you can view all the nodes you have deployed, along with their status and details.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '#billDetails',
    content:
      'Here you can check your billing history and payment details for your deployed nodes.',
    placement: 'right',
    disableBeacon: true,
  },
];
export const stepsMobile = [
  {
    target: '#welcome-android', // Welcome message element
    content:
      'Welcome to our platform! Here, you can easily navigate through different sections and get started with the features available.',
    disableBeacon: true, // Disable the entry beacon to make the intro more smooth
    placement: 'center',
  },
  {
    target: '#menu-icon', // Icon to open the navigation menu
    content:
      'Click here to open the navigation menu. From here, you can explore different sections of the platform, like Dashboard, Purchases, Orders, and more. Use this menu to navigate seamlessly.',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: '#notifications-icon', // Icon to open the notifications modal
    content:
      'Click here to open your notifications. Stay up-to-date with the latest updates and alerts related to your account.',
    placement: 'bottomLeft',
    disableBeacon: true,
  },
  {
    target: '#profile-menu-icon', // Icon to open the profile menu
    content:
      'Click here to access your profile and settings. From here, you can manage your personal information, preferences, change from lessee to lessor, and more.',
    placement: 'left',
    disableBeacon: true,
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
export const routesLessee = {
  4: '/genesis/dashboard',
  5: '/genesis/purchase',
  6: '/genesis/instance',
  7: '/genesis/orders',
  8: '/genesis/dashboard',
  10: '/genesis/deployNode',
  11: '/genesis/nodes',
  12: '/genesis/billDetails',
};

export const routesLesssor = {
  1: '/genesis/dashboard',
  2: '/genesis/deployNode',
  3: '/genesis/nodes',
  4: '/genesis/billDetails',
};
