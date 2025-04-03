import { empty } from './lang';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// 注册 duration 插件
dayjs.extend(duration);

// 日期格式类型
export const DATE_FORMAT_TYPE = {
  YM: 'YYYY-MM',
  YMD: 'YYYY-MM-DD',
  YMDH: 'YYYY-MM-DD HH',
  YMDHM: 'YYYY-MM-DD HH:mm',
  YMDHMS: 'YYYY-MM-DD HH:mm:ss',
  YMD_START: 'YYYY-MM-DD 00:00:00',
  YMD_END: 'YYYY-MM-DD 23:59:59',
};

export const formatDateYMD = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
export function formatISODate(isoString) {
  const dateObj = new Date(isoString);

  // format YYYY-MM-DD
  const date = dateObj.toISOString().split('T')[0];

  //  format HH:MM:SS
  const time = dateObj.toISOString().split('T')[1].split('.')[0];

  return `${date} ${time}`; // return "YYYY-MM-DD HH:MM:SS"
}

export const formatDateMD = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}-${day}`;
};

export const formatTime = (seconds) => {
  if (seconds < 60) {
    return `${seconds} S`;
  } else {
    const minutes = Math.floor(seconds / 60);
    if (seconds % 60 === 0) {
      return `${minutes} MIN`;
    } else {
      return `${minutes + 1} MIN`; // Round up if not an exact minute
    }
  }
};

export const formatToHours = (seconds) => {
  if (empty(seconds) || isNaN(seconds)) return '';
  return Math.floor(seconds / 3600); // Round up if not an exact minute
};

/**
 * 计算指定时间点到当前时间的时长
 * @param {string} timePoint - 时间点 (格式应与 dayjs 支持的格式一致)
 * @param {object} options - 配置项，控制显示哪些单位
 * @param {boolean} options.showYears - 是否显示年
 * @param {boolean} options.showMonths - 是否显示月
 * @param {boolean} options.showDays - 是否显示天
 * @param {boolean} options.showHours - 是否显示小时
 * @param {boolean} options.showMinutes - 是否显示分钟
 * @param {boolean} options.showSeconds - 是否显示秒
 * @returns {string} 格式化的时长字符串
 */
export function calculateDuration(
  timePoint,
  options = {
    showYears: true,
    showMonths: true,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
  },
) {
  const {
    showYears = true,
    showMonths = true,
    showDays = true,
    showHours = true,
    showMinutes = true,
    showSeconds = true,
  } = options;

  // 当前时间和开始时间
  const startTime = dayjs(timePoint);
  const now = dayjs();

  if (!startTime.isValid()) {
    return '--';
  }

  // 计算年、月、日的差值
  const years = now.diff(startTime, 'year');
  const months = now.diff(startTime.add(years, 'year'), 'month');
  const days = now.diff(
    startTime.add(years, 'year').add(months, 'month'),
    'day',
  );

  // 计算时间部分（时分秒）
  const startOfDay = startTime
    .add(years, 'year')
    .add(months, 'month')
    .add(days, 'day');
  const timeDiff = dayjs.duration(now.diff(startOfDay));
  const hours = timeDiff.hours();
  const minutes = timeDiff.minutes();
  const seconds = timeDiff.seconds();

  // 根据配置生成时长字符串
  const parts = [];
  if (showYears && years > 0) {
    parts.push(`${years} Years`);
  }
  if (showMonths && months > 0) {
    parts.push(`${months} Months`);
  }
  if (showDays && days > 0) {
    parts.push(`${days} Days  `);
  }
  if (showHours && hours > 0) {
    parts.push(`${hours} Hours`);
  }
  if (showMinutes && minutes > 0) {
    parts.push(`${minutes} Mins`);
  }
  if (showSeconds && seconds > 0) {
    parts.push(`${seconds} Seconds`);
  }

  // 如果没有任何部分，则返回默认提示
  return parts.length > 0 ? parts.join(' ') : 'no running time information';
}
