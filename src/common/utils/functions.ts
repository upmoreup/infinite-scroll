/**
 * @description 일정 주기마다 이벤트를 모아서 한 번씩 이벤트를 발생하도록 하는 throttle 함수
 * @param handler
 * @param timeout
 * @returns
 */
export const throttle = (handler: (...args: any[]) => void, timeout = 300) => {
  // let invokedTime: number;
  // let timer: number;
  return function (this: any, ...args: any[]) {
    // rAF의 콜백은 setTimeout이 처리되는 Task Queue보다 우선순위가 높은 Animation Frames에서 처리되며 브라우저가 렌더링하는 빈도인 60pfs에 맞춰서 실행
    // 따라서 setTimeout을 사용한 것보다 실행 시간을 더 보장할 수 있음음
    window.requestAnimationFrame(() => {
      handler.apply(this, args);
    });

    // 초기 코드
    //   if (!invokedTime) {
    //     // 첫 이벤트 발생 시 핸들러 실행, 실행된 시간을 저장
    //     handler.apply(this, args);
    //     invokedTime = Date.now();
    //   } else {
    //     clearTimeout(timer);
    //     timer = window.setTimeout(() => {
    //       // timeout으로 지정한 시간이 지나기 전까지 timer를 초기화하여 이벤트 발생 무효화
    //       if (Date.now() - invokedTime >= timeout) {
    //         handler.apply(this, args);
    //         invokedTime = Date.now();
    //       }
    //     }, Math.max(timeout - (Date.now() - invokedTime), 0));
    //   }
    // };
  };
};
