### **Janction Help**

Welcome to the Janction platform! This help document aims to guide you on how to use the various functions of the platform to ensure that you can smoothly complete the buyer and seller operations.

### **1. Register and login**

#### **1.1 Registration and login entrance**

1. Users can quickly enter the registration and login process through the " **Get Started** " button on the homepage.
2. In addition, there is also a " **Get Started** " button on the "Get Started" page, which can be clicked to enter the login and registration interface.

#### **1.2 Connect to your wallet**

1. In the login and registration interface, users need to complete identity verification by connecting to a wallet. Supported wallets include common Web3 wallets such as MetaMask.
2. Users click the " **Connect wallet** " button, select their commonly used wallet, and authorize the connection. After the connection is successful, the system will automatically identify the user's identity based on their wallet address.

#### **1.3 Enter the buyer page by default**

1. After each successful user login, the system will default to the buyer's page (Dashboard). On the buyer's page, users can manage their own accounts, view leased computing resources, manage funds, etc. The upper left corner of the page will display whether the current role is buyer or seller.

#### **1.4 First-time registered seller**

1. After the user clicks on the avatar in the upper right corner and selects " **Switch to lessor's role** ", a seller registration interface will pop up.

##### Seller registration interface:

1. At the seller registration interface, users need to choose between pledging or real-name authentication.

**Staking** : Staking activates the seller's account by paying a certain amount of money and allows the user to start renting out their server resources.

- **Staking process** :
- After the user selects the "Staking" option, enter the amount to be pledged.
- After confirming the pledged amount, click the "Confirm Staking" button to confirm, and the system will deduct the corresponding amount from the user's wallet.
- After the completion of the pledge, the seller function will be officially activated, and users can start renting out their server resources.

**Real-name authentication** : If the user chooses real-name authentication, the system will guide the user to upload identity proof and other necessary information for identity verification.

- **Real name authentication process** :
- The user uploads the identity proof and other materials for verification. After the authentication is successful, the seller function will be activated, and the user can rent the server in the seller interface.

1. **Complete registration** :

Regardless of whether the registration is completed through pledge or real-name authentication, users will obtain seller privileges and be able to publish and manage server resources on the platform, and perform operations such as renting.

### **2. Personal account management**

#### **2.1 Enter personal account settings**

1. Users can click the avatar in the upper right corner, expand the personal account card, and click " **personal information** " in the card to enter the personal information setting page.

#### **2.2 Change profile photo and nickname**

1. Users can click the profile picture area to upload local pictures to replace the default profile picture.
2. Users can modify their nicknames.

#### **2.3 Email verification**

1. After the user enters the email address, the system will send a verification code to the user's email. The user needs to check the verification code in the email and enter it into the text box provided by the system to complete the email verification.
2. The valid period of the verification code is usually 10-15 minutes, and the user needs to complete the verification within this time.

#### **2.4 Complete personal information**

1. In addition to profile picture and nickname, users can fill in other personal information (such as address, time zone, etc.), and the system will automatically recommend time zones based on the user's location.
2. On the personal information page, users can update their personal information at any time.

### **3. Buyer selection function**

#### **3.1 Purchase interface**

##### **3.1.1 purchase method**

- **Custom purchase** :

Users can choose to customize the configuration, set the rental requirements of the server, and make detailed customization, such as selecting the hardware configuration of the server (CPU, GPU type, etc.).

  

- **Quick purchase** :

In order to simplify the purchase process, the system also provides a quick purchase function. Users can directly select preset configurations and quickly complete the purchase process.

##### **3.1.2 rental duration and unit price**

1. In the purchase interface, users need to choose the rental duration, and the options include: one day, one week, one month, and three months.

\- **Rental duration and unit price** :

\- 1 day rent: base unit price × 1

\- 1 week rent: base unit price × 6

\- January rent: base unit price × 25

\- 3 months rent: base unit price × 70

##### **3.1.3 payment methods**

- Payment methods include USDC, USDT, and veJCT (Janction Token).

Users can choose different payment methods for payment.

The payment amount will be automatically calculated based on the rental duration and configuration.

##### **3.1.4 Payment Rules and Limited Time Payments**

1. Payment must be completed within **20 minutes** . If the user does not pay within 20 minutes, the order will be automatically cancelled.
2. **Payment Confirmation** :

On the payment page, users will see detailed information about the confirmed fee, including the balance of points and the required payment amount.

If the user's points are sufficient, click confirm to complete the payment.

\- If the user's points are insufficient, the system will prompt " **insufficient points, please recharge** ", and jump to the recharge page.

##### **3.1.5 after payment is completed**

1. After the lease is completed, the user will obtain the right to use the leased server and automatically jump to the **My Instance** page. The first line of the list is the information of the newly leased server. Click on the remote connection in the operation list to enter the command to use the leased server resources at the end point.

#### **3.2 Buyer Smart Contract Wallet**

##### **3.2.1 Smart Contract Wallet**

Smart contract wallets are used to ensure the transparency and security of platform transactions. Through smart contracts, leasing parties can ensure the automatic execution of payments and resource provision without the need for third-party intervention, reducing transaction risks.

- **Payee Payment Period** : According to a certain time period, the payee will receive a one-time payment from the payer. The payer pays a fixed amount according to the lease duration (such as 1 day, 1 week, 1 month, etc.).

  

\- **Formula** :

​    $$ \frac{R}{D_r} = C $$  

Where R is the total payment amount, D_r is the lease duration, and C is the daily collection amount.

- **The unit price paid by the payer varies with the length of the lease** :

\- Unit price for 1 day: base unit price

\- 1 week's unit price: base unit price × 6

\- January unit price: base unit price × 25

\- Unit price for 3 months: base price × 70

##### **3.2.2 payment process**

1. Payment methods: Supports three payment methods: USDC, USDT, and veJCT. The payment funds will be deposited into the smart contract wallet and automatically allocated to the payee according to the contract during the lease period.

##### **Transparency and security of 3.2.3 contracts**

1. When users make payments, the funds will be securely stored in the smart contract, and both parties can view the progress of the transaction, ensuring transparency and compliance.
2. Contracts handle the transfer of funds through automated mechanisms without human intervention, reducing the risk of human error or fraud in transactions.

### **4. Buyer Dashboard**

#### **4.1 Rent equipment running time display**

1. The chart shows that the buyer's Dashboard page will display the daily running time of the CPU and GPU devices rented by the user.

The horizontal axis represents the date, and the vertical axis represents the daily operating hours.

This chart helps users view and analyze the usage of each device, making it easy to evaluate resource utilization efficiency.

\- **Device category** : You can view the running time of CPU and GPU separately, which is convenient to distinguish the usage status of different hardware.

#### **4.2 Blockchain and Cloud Services News**

1. News module: Displays news, technology trends, industry dynamics and other information related to blockchain and Cloud Services. Users can learn about the latest developments of the platform and related industries through the news module.
2. News display method: News content is arranged in chronological order and supports short summary display.

#### **4.3 Mainstream server display**

1. Server display card: In the Dashboard interface, users can see the basic information of mainstream servers.

The display content includes: server model, market purchase price, rental price and price fluctuations, market share, etc.

Each card will display basic information of 5 mainstream servers.

\- **Click to view more** : If users want to view more server information, they can click the " **See All** " button in the lower right corner to jump to the full display page.

#### **4.4 List of Recommended Servers**

1. Recommended Servers: Display rental servers that have been published on the Janction platform. Recommended servers will prioritize servers with high rental usage and good reputation.

Recommended information includes: server model, performance, rental price, etc.

### **5. Buyer's Fund Management**

Users can view and manage the balance, expenditure records, transaction history and other information in the account through the fund management interface, which is convenient for real-time monitoring of fund dynamics.

#### **5.1 Enter the fund management interface**

- Users click on the avatar in the upper right corner and select **"Fund Management"** in the card to enter the fund management interface.

#### **5.2 Display balance**

- On the fund management page, users can view the balance of the current account, supporting multiple payment currencies, such as **USDC** , **veJCT** (Janction Token), etc.
- **Balance shows** :

The account balance will be updated in real time, accurately displaying the user's current available funds.

Users can use their balance to make payments, recharge, or view historical expenses.

#### **5.3 Display expenditure**

- The system will display the user's expenditure records, including all rentals, paid fees, etc.
- **Expenditure category** :

\- Users can view expenditure records by different categories, such as: **server rental fees** , **platform fees** , **recharge fees** , etc.

- **Expenditure records** :

Expenditure records will be arranged in chronological order and accompanied by detailed amount, date, and category information for easy user management.

#### **5.4 View transaction list**

- **Transaction history** :

In the transaction list, users can view all transaction records, including expenditures, refunds, withdrawals, etc.

- **Filter function** :

Users can filter by date or transaction category to view different types of transaction records.

\- **Filter by date** : View transactions within a specific date or date range.

\- **Filter by category** : Select to view transactions in different categories such as expenditures, refunds, withdrawals, etc.

- **Transaction record details** :

Each transaction can be clicked to view detailed information, including transaction type, amount, status, etc.

#### **5.5 View specific transactions**

- Users can click on a transaction record to view detailed information about the transaction.
- **Transaction details** :

\- The transaction details page will display the following information:

\- **Amount and type of currency received** : for example, the currency involved (USDC, veJCT) and amount.

\- **Transaction type** : e.g. expenditure, refund, withdrawal, etc.

\- **Transaction status** : the status of the transaction (such as success, failure, pending, etc.).

\- **Transaction Date** : Shows the specific date and time of the transaction.

\- **Transaction ID** : Each transaction has a unique transaction ID, which users can use to query.

### **6. veJCT integral recharge interface**

Users can easily recharge their accounts with veJCT points through the **veJCT points recharge interface** , which can be used to pay various fees, lease resources, or complete other payment operations within the platform.

#### **Recharge process**

1. Click the **"Recharge veJCT"** button.
2. Choose the recharge method, such as **"exchange veJCT through USDC"** .
3. Enter the recharge amount and the system calculates the required amount of USDC.
4. Confirm recharge information, click the **"Confirm recharge"** button.
5. After completing the recharge, the balance is updated in real time and the recharge record is automatically generated.

#### **6.1 Recharge interface entrance**

- Users click the **"Recharge veJCT"** button in the wallet interface to enter the veJCT points recharge interface.
- This interface will display the current account balance, available points, and relevant information for recharging.

#### **6.2 Recharge method**

- **Recharge method** :

\- Users can choose to purchase veJCT points through **USDC** or other stablecoins and exchange them according to the platform exchange rate.

- **Supported recharge currencies** :

The platform supports multiple currencies for recharge, such as **USDC** , **USDT** , **ETH** , etc., and displays the current exchange rate and handling fee during the recharge process.

#### **6.3 Recharge amount input**

- Users can choose the recharge amount, and the system will provide a text box for users to enter the number of veJCT points to recharge.

#### **6.4 Recharge Address and Payment Confirmation**

- After the user selects the recharge method, the system will display the recharge address.
- After the user confirms the amount, click the **"Confirm Recharge"** button, and the system will prompt the user to check the recharge information.
- **Payment Confirmation** :

For purchasing veJCT through stablecoins, users need to confirm the payment amount and confirm the transaction through a smart contract.

#### **6.5 Recharge Record**

- After the recharge is completed, the recharge record will be displayed in the user's wallet history.
- Users can view detailed information about each recharge, including:

\- **Recharge amount** (such as USDC).

\- **Recharge currency** (such as: USDC, ETH, etc.).

\- **Recharge time and status** (such as: successful, to be confirmed, etc.).

#### **6.6 Recharge status and confirmation**

- **Recharge status** :

After the recharge is completed, the system will confirm the recharge transaction through blockchain and recharge veJCT points to the user's account.

- **Recharge Confirmation** :

After the recharge is completed, the user will receive a confirmation message, and the veJCT points will be immediately added to the wallet balance.

#### **6.7 Recharge Timeliness Reminder**

- The system will prompt users about the timeliness of recharge transactions. On-chain recharge may take some time to confirm, and users need to wait patiently.

If the recharge amount is not credited in time, the user can view the recharge record or contact customer service for processing.

### 7. The seller deploys the node and places an order

The seller can rent their own server to other users. The following is the operation process:

#### 7.1 Deploy server and obtain device identification code

- The seller first needs to deploy their own server on the platform.
- After the deployment is complete, the system generates a device identification code and sends it to the seller through the end point.

#### 7.2 Enter the device identification code to the pending order interface

- The seller enters the device identification code on the pending order interface.
- The system will automatically recognize the detailed information of the device (such as model, performance, etc.).

#### 7.3 Set rental price and duration

- The seller can refer to the market price to set the rental price of the server.
- The seller needs to choose the payment currency for receiving payment (such as USDC, USDT, veJCT, etc.).
- After setting up, the system will display the unit price after deducting 5% service fee, and inform the seller that the platform will charge a 5% service fee.

#### 7.4 Tips and long-term preferential policies

- The system will remind the seller that the platform provides preferential policies for long-term tenants.
- The service fee and unit price will be detailed, and the seller can view the final profit.

### 8. Seller smart contract wallet

#### 8.1 Payment and collection process

- **Payment period** : The payee receives a one-time payment from the payer according to a certain time period.
- **Calculation formula** : The payment formula between the payer and the payee is:

**Formula** :

​    $$ \frac{R}{D_r} = C $$  

Where R is the total payment amount, D_r is the lease duration, and C is the daily collection amount.

#### 8.2 Unit Price Calculation

- The unit price of the payer is adjusted according to the rental duration, which includes:

\- One day

\- One week

\- One month

\- Three months

Unit price is calculated proportionally: 1:6:25:70 (day: week: month: quarter)

#### 8.3 Currency of receipt

- **The payee** can choose from the following currencies to receive payments:

  \- USDC

  \- USDT

  \- veJCT（Janction Token）

### 9. Seller node management background (My Nodes)

Sellers can view and manage the status and connection status of their server devices through the node management background. The following are the functions and processes of node management.

#### 9.1 Device Status

The device status is displayed at the top of the table to help users understand the current operating status of the device. The status includes:

- 🟠 running  

Deployed nodes, no pending orders

- 🟡 **listed**

Placed order, waiting for buyer to rent

- 🟢active

The equipment is currently being rented by other users.

#### 9.2 Device Details interface

The equipment details page provides detailed equipment information to help sellers track and manage their equipment.

- **Device and Status List**  

Display basic information and status of all devices.

- **Uptime chart**  

The top of the page displays a normal operating time chart for the past 30 days to help users understand whether the device has experienced downtime.

- **Main indicators of equipment**  

Users can view key metrics for the following devices:

\- GPU/CPU type

-% uptime

\- Transport traffic

\- Connection speed

\- security compliance

\- Device location

- **Daily Rewards Revenue**  

Display the rental income received by the device every day.

### 10. Seller Fund Management

The fund management interface helps sellers track and manage profits and transaction records. The following are the functions and operation procedures of fund management.

#### 10.1 Funding Overview

- **View Total Revenue**  

Users can view the total revenue since they started using the platform, including all revenue sources (node revenue, rental revenue, pledge revenue, etc.).

- **View rental income**  

The seller can view the revenue obtained by renting server equipment. The rental revenue will be calculated based on factors such as equipment rental duration and payment currency.

- **View Staking Benefits**  

The seller can view the revenue of the staking node. The staking revenue is calculated based on factors such as the staking amount and time of the node.

#### 10.2 View Transaction List

- **View all transaction records**  

Users can view all transaction records, including profits, refunds, withdrawals, etc., providing a comprehensive financial overview.

- **Transaction Filter Function**  

Users can filter transaction records by the following criteria:

\- **Date filtering** : View transaction history by specific date or date range.

\- **Category Filter** : Filter transactions by category, such as earnings, refunds, withdrawals, etc.

#### 10.3 Transaction Details

- **View specific transactions**  

Users can click on a transaction record to view detailed information. The details page of each transaction includes:

\- **Amount and type of currency received** : Shows the currency involved in the transaction (such as USDC, USDT, veJCT, etc.) and the amount.

\- **Transaction type** : for example: earnings, refunds, withdrawals, etc.

\- **Transaction status** : for example: success, failure, pending, etc.

\- **Transaction Date** : Shows the specific date and time of the transaction.

\- **Transaction ID** : Each transaction has a unique transaction ID, which users can use to query.

#### 10.4 Withdrawal function

In the transaction list, users can click the withdrawal button to withdraw funds. When withdrawing funds, users can select the withdrawal amount and currency, and confirm accordingly.

Through the fund management interface, sellers can easily view, filter, and manage their own financial status, ensuring the transparency and security of account funds, while providing clear transaction records and profit analysis.

### 11. Seller Dashboard

The seller's Dashboard is the main interface for sellers to manage their own servers and revenue, providing real-time viewing of key indicators such as server status, memory usage, revenue, and tasks. The following is the design and function of the Dashboard interface.

#### 11.1 Sort by server rental duration

- **Rental duration display**  

At the top of the Dashboard, display the servers rented by the seller, sorted from high to low by rental duration.

- **See all**

The seller can click the "See All" button to view a detailed list of all rental servers, including rental duration, equipment information, etc.

#### 11.2 Server status display

- **Server status display**  

In the Dashboard, the seller can see the current status of all their rental servers. The server status will be displayed in the following categories:

\- **Released** : The device has been released and is no longer rented.

\- **Idle** : The device is deployed and idle, not yet leased.

\- **Warning** : If there is a problem or abnormal state of the device, please check it carefully.

\- **On-chain Task** : The device is performing on-chain tasks (such as blockchain verification, etc.).

\- **Off-chain task** : The device is performing off-chain tasks (such as computing, storage, etc.).

\- **Undefined** : The device state is unclear or unknown.

#### 11.3 Memory usage

- **On-chain and off-chain memory usage**  

The seller can view the usage of the device's on-chain and off-chain Random Access Memory.

\- **On-chain memory** : Represents the memory used by the device to process blockchain-related tasks.

\- **Off-chain memory** : Represents the memory a device uses to process other tasks, such as computing tasks.

\- **Free memory** : The memory currently free for the device.

- **See all (see all)**  

Click the "See All" button, and the seller can jump to the "My Nodes" page to view more detailed memory usage and other information about the node.

#### 11.4 Revenue Overview

- **Total proceeds**  

Display the total revenue obtained by the seller through renting servers, pledging equipment, etc.

- **Rental income**  

Display the revenue obtained by the seller through renting servers.

- **Income from pledge**  

Display the revenue obtained by the seller through pledging equipment.

- **Monthly Objectives**  

Display the monthly revenue target set by the seller for themselves. The seller can click the "Set Goal" button to enter the goal setting interface and set the monthly revenue target.

#### 11.5 Task Manager

- **Task Manager**  

The seller can view the details of all currently running tasks in the Task Manager.

### 12. Seller Staking Interface

#### 12.1 Total Wallet Balance and Active Staking Amount

On the seller's pledge interface, the following information is first displayed:

- **Total Wallet Balance** : The total asset balance in the seller's current wallet.
- **Active Staking Amount** : The amount currently staked, the device's staking amount. Shows the amount currently staked and active in the network.
- **Cool Down Amount** : The pledged amount in Cool Down, showing the cooling period of the current pledged amount. The seller needs to wait for the end of Cool Down before using these funds for pledge or withdrawal again.

#### 12.2 Staking Process

The seller can proceed with the pledge operation according to the following steps:

1. **Select Device** : In the staking interface, the seller can find and select the device they want to stake. The device list will display available devices and corresponding staking demand information.
2. **Click the Staking button** : After selecting the device, the seller clicks the "Staking" button to enter the Staking Settings window.
3. **Enter the number of staking points** : In the pop-up staking window, the seller needs to enter the number of points they want to stake. The system will automatically prompt for available points based on device requirements and staking rules.
4. **Confirm pledge operation** : After entering the pledge amount, the seller confirms the pledge operation. Click the "Stake" button to confirm the pledge and complete the pledge process.

After the pledge operation is completed, the seller's equipment will be activated and participate in the corresponding network tasks, and the pledge amount will be deducted and enter the cooling-off period.

### 13. **Notes**

In order to ensure that the seller can successfully rent the server, the following are the basic requirements for equipment performance and detailed information on supporting equipment. The seller must ensure that its server meets the following standards to obtain the best rental experience and benefits.

#### 13.1 **Supported GPU Devices**  

The seller's server needs to be equipped with GPU devices that meet the platform requirements. The following are the GPU models supported by the platform:

- **NVIDIA GPUs** (supported models include but are not limited to):

\- **GeForce GTX 1080 Ti**

  \- **GeForce RTX 2080 Ti**

  \- **GeForce RTX 3050**

  \- **GeForce RTX 3070 Ti**

  \- **GeForce RTX 3080**

  \- **GeForce RTX 3090**

  \- **GeForce RTX 4090**

  \- **Tesla T4**

  \- **Tesla V100-SXM2-32GB**

\- **A100-SXM4-40GB**

  \- **H100 PCIe**

#### 13.2 **Supported CPU Devices**  

The platform also supports specific models of CPU devices. The following are the supported CPU models:

- **Apple CPU** (supported models include but are not limited to):

  \- **M1 Pro**

  \- **M2 Max**

  \- **M2 Ultra**

#### 13.3 **Hardware Performance Requirements**  

- **Computing Power** : To ensure that the equipment can handle network tasks, the seller's equipment needs to have sufficient computing power. The platform regularly inspects the equipment to ensure that they can handle the workload required by the platform.

  

- **Storage and Memory** : It is recommended that the device be equipped with at least **16GB of memory** and sufficient storage space to ensure that it can support high-frequency data exchange and task processing.

#### 13.4 **Network Requirements**  

- **Download/Upload Bandwidth** : The internet bandwidth of the device directly affects the rental opportunities and profits of the device. For every additional 1GB of bandwidth, the probability of the device being rented and the rewards obtained will increase. Therefore, the seller should ensure that the device has a stable and high-speed network connection.

#### 13.5 **Device Configuration and Support**  

- **Device type support** : The platform supports multiple configurations of devices, including single GPU, multi-GPU, CPU combination and other types. The seller can choose and lease according to their own hardware configuration.

  

- **Equipment Monitoring and Verification** : The equipment will be tested through the platform's verification system to ensure compliance with network standards. The seller's equipment must be able to be monitored in real time and comply with the platform's requirements.