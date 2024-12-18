export const CONFIGURATION = {
  points_daily_quantity: {
    title: 'Quantity issued daily',
    key: 'points_daily_quantity',
    type: 'number',
  },
  points_distribution_cycle: {
    title: 'Discharge cycle',
    key: 'points_distribution_cycle',
    type: 'number',
    unit: 'day',
  },
  // points_growth_rate: {
  //   title: 'Points Growth Rate',
  //   key: 'points_growth_rate',
  //   unit: '%',
  //   type: 'number',
  // },
  server_rental_transaction_fee: {
    title: 'Server Rental Transaction Fee',
    key: 'server_rental_transaction_fee',
    unit: '%',
    type: 'number',
  },
  mining_machine_management_fee: {
    title: 'Mining Machine Management Fee',
    key: 'mining_machine_management_fee',
    unit: '%',
    type: 'number',
  },
  miner_price: {
    title: 'Miner Machine Price',
    key: 'miner_price',
    unit: 'USDT',
    type: 'number',
    format: true,
  },
  payment_address: {
    title: 'Payment address',
    key: 'payment_address',
    unit: '',
    copy: true,
  },
};
