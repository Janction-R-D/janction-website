import { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import data from './create.json';
// import './create.less';
import RemoteLoginModal from './RemoteLoginModal';

export default function Create1() {
  const {
    gpuModel,
    gpuQuantity,
    paymentMethod,
    processorType,
    locations1,
    locations2,
  } = data;
  const [showModal, setShowModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [payMethod, setPayMethod] = useState({
    name: '按量计费',
    discount: 0.1,
  });
  const [location, setLocation] = useState({
    name: '重庆A区',
    priceFactor: 1,
  });
  const [selectedGpu, setSelectedGpu] = useState({
    name: '全部',
    pricePerGPU: 1,
  });
  const [quantity, setQuantity] = useState({
    quantity: 1,
    priceFactor: 1,
  });
  const [processor, setProcessor] = useState({
    id: '139机',
    name: 'RTX 4090D 24GB',
    cpu: 'CPU: 16核 - 内存: 80GB',
    cpuModel: 'Xeon(R) Platinum 8474C',
    innactiveTime: '1/12',
    hardDisk: '数据盘: 50GB - 可扩容: 0GB',
    maxCpu: '12.4',
    basePrice: 100,
  });

  useEffect(() => {
    if (!processor.name) return;
    const newPrice =
      location.priceFactor *
      selectedGpu.pricePerGPU *
      quantity.priceFactor *
      processor.basePrice *
      payMethod.discount;

    setTotalAmount(newPrice.toFixed(2));
  }, [payMethod, location, selectedGpu, quantity, processor]);

  const handleChangePayMethod = (item) => {
    setPayMethod(item);
  };

  const handleChangeLocation = (item) => {
    setLocation(item);
  };

  const handleChangeGpu = (item) => {
    setSelectedGpu(item);
  };

  const handleChangeQty = (item) => {
    setQuantity(item);
  };

  const handleChangeProcessor = (item) => {
    setProcessor(item);
  };

  return (
    <div className="container">
      <p className="subtitle">
        容器实则 / <b>则建实则</b>
      </p>
      <form className="form">
        <section className="section payment-method">
          <p className="label">计费方式 :</p>
          <section>
            <div className="payment-options">
              <ul className="payment-list">
                {paymentMethod.map((item, index) => (
                  <li className="payment-item" key={index}>
                    <label
                      htmlFor={item.name}
                      className={`payment-label ${
                        payMethod.name === item.name ? 'active' : ''
                      }`}
                    >
                      {item.name}
                      <input
                        type="radio"
                        name="计费方式"
                        value={item.name}
                        id={item.name}
                        className="hidden"
                        onClick={() => handleChangePayMethod(item)}
                      />
                    </label>
                  </li>
                ))}
              </ul>
              <span className="rule-link">计费规则</span>
            </div>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </section>
        </section>
        <section className="section ">
          <section className="location">
            <p className="label">选择地区 :</p>
            <div className="location-options">
              <ul className="location-list">
                {locations1.map((item, index) => (
                  <li className="location-item" key={index}>
                    <label
                      htmlFor={item.name}
                      className={`location-label ${
                        location.name === item.name ? 'active' : ''
                      }`}
                    >
                      重庆A区
                      <input
                        type="radio"
                        name="地区"
                        value={item.name}
                        id={item.name}
                        className="hidden"
                        onClick={() => handleChangeLocation(item)}
                      />
                    </label>
                  </li>
                ))}
              </ul>
              <ul className="location-list">
                {locations2.map((item, index) => (
                  <li className="location-item" key={index}>
                    <label
                      htmlFor={item.name}
                      className={`location-label ${
                        location.name === item.name ? 'active' : ''
                      }`}
                    >
                      重庆A区
                      <input
                        type="radio"
                        name="地区"
                        value={item.name}
                        id={item.name}
                        className="hidden"
                        onClick={() => handleChangeLocation(item)}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className=" gpu">
            <p className="label">GPU型号 :</p>
            <section className="gpu-options">
              <label className="gpu-option" htmlFor="全部">
                <input
                  type="checkbox"
                  id="全部"
                  name="GPU型号"
                  value="全部"
                  checked={selectedGpu.name === '全部'}
                  onChange={() =>
                    handleChangeGpu({ name: '全部', pricePerGPU: 1 })
                  }
                />
                <p>全部</p>
              </label>
              {gpuModel.map((item, index) => (
                <label className="gpu-option" htmlFor={item.name} key={index}>
                  <input
                    type="checkbox"
                    id={item.name}
                    name="GPU型号"
                    value={item.name}
                    checked={selectedGpu.name === item.name}
                    onChange={() => handleChangeGpu(item)}
                  />
                  <p>{item.name}</p>
                </label>
              ))}
            </section>
          </section>
          <section className="  quantity">
            <p className="label">GPU数量 :</p>
            <ul className="quantity-list">
              {gpuQuantity.map((item, index) => (
                <li className="quantity-item" key={index}>
                  <label
                    htmlFor={`${item.quantity}`}
                    className={`quantity-label ${
                      quantity.quantity === item.quantity ? 'active' : ''
                    }`}
                  >
                    {item.quantity}
                    <input
                      type="radio"
                      name="GPU数量"
                      value={item.quantity}
                      id={`${item.quantity}`}
                      className="hidden"
                      onClick={() => handleChangeQty(item)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </section>
          <section className=" processor">
            <p className="label">选择王机 :</p>
            <table className=" table-custom">
              <thead>
                <tr className="table-header">
                  <th className="header-cell">王机ID</th>
                  <th className="header-cell">算力型号</th>
                  <th className="header-cell">空闲</th>
                  <th className="header-cell">每GPU分</th>
                  <th className="header-cell">CPU型号</th>
                  <th className="header-cell">硬盘</th>
                  <th className="header-cell">最高CPU</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {processorType.map((item, index) => (
                  <tr className="table-row" key={item.id}>
                    <td className="cell-data clickable" data-label="王机ID">
                      <label htmlFor={item.name} className="label-row">
                        <input
                          id={item.name}
                          type="radio"
                          data-id={'idcpu'}
                          name="王机"
                          value={item.name}
                          onClick={() => handleChangeProcessor(item)}
                        />
                        {item.id}
                      </label>
                    </td>
                    <td className="cell-data" data-label="算力型号">
                      {item.name}
                    </td>
                    <td className="cell-data" data-label="空闲">
                      {item.innactiveTime}
                    </td>
                    <td className="cell-data" data-label="每GPU分">
                      {item.cpu}
                    </td>
                    <td className="cell-data" data-label="CPU型号">
                      {item.cpuModel}
                    </td>
                    <td className="cell-data" data-label="硬盘">
                      {item.hardDisk}
                    </td>
                    <td className="cell-data" data-label="最高CPU">
                      {item.maxCpu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </form>
      <section className="footer">
        <Button type="primary" onClick={() => setShowModal(true)}>
          Click to show Modal
        </Button>

        <div className="footer-info">
          <p className="cost">
            费用 : <b className="cost-amount"> {totalAmount} &#165;</b> /
            {payMethod.name === '包日' && <span>日</span>}
            {payMethod.name === '包周' && <span>周</span>}
            {payMethod.name === '包月' && <span>月</span>}
          </p>
          <p className="config-cost">
            配置费用 : <b className="config-amount"> 1.98</b> /时
          </p>
          <p className="details">费用明细</p>
        </div>
      </section>
      {showModal && (
        <main className="modal-container">
          <RemoteLoginModal setShowModal={setShowModal} showModal={showModal} />
        </main>
      )}
    </div>
  );
}
