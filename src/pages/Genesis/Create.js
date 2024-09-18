import { useEffect, useState } from 'react';

import data from './create.json';
import './create.css';

export default function Create() {
  const { gpuModel, gpuQuantity, paymentMethod, processorType, locations1, locations2 } = data;
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [payMethod, setPayMethod] = useState({
    name: '按量计费',
    discount: 0.1,
  });
  const [location, setlocation] = useState({
    name: '重庆A区',
    priceFactor: 1,
  });
  const [selectedGpu, setselectedGpu] = useState({ name: '全部', pricePerGPU: 1 });

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
    setlocation(item);
  };
  const handleChangeGpu = (item) => {
    setselectedGpu(item);
  };

  const handleChangeQty = (item) => {
    setQuantity(item);
  };
  const handleChangeProcessor = (item) => {
    setProcessor(item);
  };

  return (
    <div className="  relative p-3 px-2">
      <p className="p-2">
        容器实则 / <b>则建实则</b>
      </p>
      <form className="flex flex-col gap-6">
        <section className="flex gap-3 rounded-md border border-gray-400 p-3 py-5 shadow sm:p-6">
          <p className="text-nowrap">计费方式 :</p>
          <div>
            <div className="flex flex-wrap gap-3 pb-2">
              <ul className="flex ">
                {paymentMethod.map((item, index) => (
                  <li className="font-bold" key={index}>
                    <label
                      htmlFor={item.name}
                      className={`cursor-pointer  border p-1 px-2 sm:p-2 sm:px-5  ${
                        payMethod.name === item.name
                          ? 'bg-green bg-opacity-20 text-green outline-2 outline-green'
                          : ''
                      } transition-all duration-150 hover:bg-green hover:bg-opacity-10`}
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
              <span className="cursor-pointer font-medium text-green">计费规则</span>
            </div>
            <p className="py-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </section>
        <section className="flex flex-col gap-6 rounded-md border border-gray-400 p-3 py-5 shadow sm:p-6">
          <section className="flex gap-3  ">
            <p className="text-nowrap">选择地区 :</p>
            <div>
              <div className="flex flex-col  gap-6 pb-2">
                <ul className="flex flex-wrap gap-2 sm:gap-0">
                  {locations1.map((item, index) => (
                    <li className="font-bold" key={index}>
                      <label
                        htmlFor={item.name}
                        className={`cursor-pointer  border p-1 px-2 sm:p-2 sm:px-5 ${
                          location.name === item.name
                            ? 'bg-green bg-opacity-20 text-green outline-2 outline-green'
                            : ''
                        } transition-all duration-150 hover:bg-green hover:bg-opacity-10`}
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
                <ul className="flex flex-wrap gap-2 sm:gap-0">
                  <ul className="flex flex-wrap gap-2 sm:gap-0">
                    {locations2.map((item, index) => (
                      <li className="font-bold" key={index}>
                        <label
                          htmlFor={item.name}
                          className={`cursor-pointer  border p-1 px-2 sm:p-2 sm:px-5 ${
                            location.name === item.name
                              ? 'bg-green bg-opacity-20 text-green outline-2 outline-green'
                              : ''
                          } transition-all duration-150 hover:bg-green hover:bg-opacity-10`}
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
                </ul>
              </div>
            </div>
          </section>
          <section className="flex  gap-3">
            <p className="text-nowrap">GPU型号 :</p>
            <section className="flex flex-col flex-wrap gap-3 sm:flex-row">
              <label className="flex cursor-pointer items-center gap-3" htmlFor="全部">
                <input
                  type="checkbox"
                  id="全部"
                  name="GPU型号"
                  value="全部"
                  checked={selectedGpu.name === '全部'}
                  onChange={() => handleChangeGpu({ name: '全部', pricePerGPU: 1 })}
                />
                <p>全部</p>
              </label>
              {gpuModel.map((item, index) => (
                <label
                  className="flex cursor-pointer items-center gap-3"
                  htmlFor={item.name}
                  key={index}
                >
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
          <section className="flex gap-3">
            <p>GPU数量 :</p>
            <ul className="flex ">
              {gpuQuantity.map((item, index) => (
                <li className="font-bold" key={index}>
                  <label
                    htmlFor={`${item.quantity}`}
                    className={`cursor-pointer  border p-1 px-2 sm:p-2 sm:px-5 ${
                      quantity.quantity === item.quantity
                        ? 'bg-green bg-opacity-20 text-green outline-2 outline-green'
                        : ''
                    } transition-all duration-150 hover:bg-green hover:bg-opacity-10`}
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
          <section className="jc flex flex-col gap-4 sm:flex-row">
            <p className="text-nowrap">选择王机 :</p>
            <table className="table-custom  mx-auto w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-300 text-xs">
                  <th className="p-3">王机ID</th>
                  <th className="p-3">算力型号</th>
                  <th className="p-3">空闲</th>
                  <th className="p-3">每GPU分</th>
                  <th className="p-3">CPU型号</th>
                  <th className="p-3">硬盘</th>
                  <th className="p-3">最高CPU</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {processorType.map((item) => (
                  <tr className="  even:bg-gray-200 even:bg-opacity-65" key={item.id}>
                    <td className=" cursor-pointer p-3 text-green" data-label="王机ID">
                      <label htmlFor={item.name} className="flex cursor-pointer items-center gap-3">
                        <input
                          id={item.name}
                          type="radio"
                          name="王机"
                          value={item.name}
                          checked={processor.id === item.id}
                          onClick={() => handleChangeProcessor(item)}
                        />
                        {item.id}
                      </label>
                    </td>
                    <td className="p-3" data-label="算力型号">
                      {item.name}
                    </td>
                    <td className="p-3" data-label="空闲">
                      {item.innactiveTime}
                    </td>
                    <td className="p-3" data-label="每GPU分">
                      {item.cpu}
                    </td>
                    <td className="p-3" data-label="CPU型号">
                      {item.cpuModel}
                    </td>
                    <td className="p-3" data-label="硬盘">
                      {item.hardDisk}
                    </td>
                    <td className="p-3" data-label="最高CPU">
                      {item.maxCpu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </form>
      <section
        className=" flex h-16 w-full items-center
        "
      >
        <div className="ml-auto flex items-center justify-end gap-4">
          <p className="text-nowrap font-semibold">
            费用 : <b className="text-lg text-error"> {totalAmount} &#165;</b> /
            {payMethod.name === '包日' && <span>日</span>}
            {payMethod.name === '包周' && <span>周</span>}
            {payMethod.name === '包月' && <span>月</span>}
          </p>
          <p className="font-semibold">
            配置费用 : <b className="text-lg text-error"> 1.98</b> /时
          </p>
          <p className=" font-semibold text-green">费用明细</p>
        </div>
      </section>
    </div>
  );
}
