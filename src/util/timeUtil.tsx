import moment from "moment";

export const getYear = (value: Date) => {
  const year = moment(value).year();

  return `${year}`;
};
export const getMonth = (value: Date) => {
  const month = moment(value).month() + 1;

  return `${month}`;
};
export const getDate = (value: Date) => {
  const date = moment(value).date();

  return `${date}`;
};

export const getHM = (value: Date) => {
  const hour = moment(value).hour();
  const correctedHour = `${hour === 12 ? 12 : (hour + 12) % 12}`.padStart(
    2,
    "0"
  );
  const min = moment(value).minute().toString().padStart(2, "0");

  return `${correctedHour}:${min}`;
};

export const getSecond = (value: Date) => {
  const second = moment(value).second().toString().padStart(2, "0");

  return second;
};

export const getAmPm = (value: Date) => {
  return moment(value).hour() >= 12 ? "pm" : "am";
};

export const getYMDDate = (value: Date) => {
  const year = moment(value).year();
  const month = moment(value).month() + 1;
  const date = moment(value).date();
  const day = getDayKorean(value);

  return `${year}년 ${month}월 ${date}일 ${day}`;
};

export const getDayKorean = (value: Date) => {
  const day = moment(value).day();

  switch (day) {
    case 0:
      return "일요일";
    case 1:
      return "월요일";
    case 2:
      return "화요일";
    case 3:
      return "수요일";
    case 4:
      return "목요일";
    case 5:
      return "금요일";
    case 6:
      return "토요일";
  }
};

export const getYMDHM = (value: Date) => {
  const utc = moment(value).utc();
  const year = `${utc.year()}`.padStart(4, "0");
  const month = `${utc.month() + 1}`.padStart(2, "0");
  const date = `${utc.date()}`.padStart(2, "0");

  const hour = `${utc.hour()}`.padStart(2, "0");
  const min = `${utc.minute()}`.padStart(2, "0");

  return `${year}-${month}-${date} ${hour}:${min}`;
};

export const getISOStringUtc = (value: Date) => {
  return moment(value).utc().toISOString();
};

export const exportTimeFromDate = (value: Date) => {
  const hour = `${moment(value).hour()}`.padStart(2, "0");
  const min = `${moment(value).minute()}`.padStart(2, "0");

  return `${hour}:${min}`;
};

/**
 *
 * @param dayTerm 며칠간격으로 할 건지
 * @param referenceDate 기준일 (시작일) UTC
 * @param startHour 시작 시간 UTC
 * @param startMinutes 시작 분 UTC
 * @param startSeconds 시작 초 UTC
 * @returns
 */
export const utcGetStartTimeAndEndTimeRangeDayTerm = (
  dayTerm: number,
  referenceDate: Date,
  startHour: number,
  startMinutes: number,
  startSeconds: number
) => {
  // 시간,분만 비교하기 위해 년도, 월, 일은 같은 걸로 설정해준다.
  const goalTime = new Date();
  goalTime.setUTCHours(startHour);
  goalTime.setUTCMinutes(startMinutes);
  goalTime.setUTCSeconds(startSeconds);

  const referenceTime = new Date();
  referenceTime.setUTCHours(referenceDate.getUTCHours());
  referenceTime.setUTCMinutes(referenceDate.getUTCMinutes());
  referenceTime.setUTCSeconds(referenceDate.getUTCSeconds());

  const startTime = referenceDate;
  if (referenceTime < goalTime) {
    startTime.setUTCDate(startTime.getUTCDate() - 1);
  }

  startTime.setUTCHours(startHour, startMinutes, startSeconds);

  const endTime = new Date(startTime);
  endTime.setUTCDate(endTime.getUTCDate() + dayTerm);
  endTime.setUTCHours(startTime.getUTCHours());
  endTime.setUTCMinutes(startTime.getUTCMinutes());
  endTime.setUTCSeconds(startTime.getUTCSeconds());

  return { startTime, endTime };
};
