import moment from "moment";

export const getHM = (value: Date) => {
  const hour = moment(value).hour();
  const min = moment(value).minute();

  return `${hour === 12 ? 12 : (hour + 12) % 12}:${min}`;
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
