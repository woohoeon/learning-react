/**
 * Chapter2
 */

(() => {

    /**
     * 프라미스
     * 
     * 프라미스는 비동기 요청을 더 쉽게 처리할 수 있게 해준다.
     * randomuser.me API로부터 데이터를 가져오는 비동기 프라미스를 하나 만들자.
     */
    {
        console.log('프라미스');

        const getFakeMembers = count => new Promise((resolves, rejects) => {
            const api = `https://api.randomuser.me/?nat=US&results=${count}`;
            const request = new XMLHttpRequest();
            request.open('GET', api);
            request.onload = () =>
                (request.status === 200) ? resolves(JSON.parse(request.response).results) :
                    rejects(Error(request.statusText));
            request.onerror = (err) => rejects(err);
            request.send();
        });

        getFakeMembers(5).then(
            members => console.log(members),
            err => console.error(new Error(err + 'randomuser.me에서 멤버를 가져올 수 없습니다.'))
        );
    }

    /**
     * 클래스
     * 
     * ES6에는 클래스 선언이 추가 되었다. 하지만 자바스크립트는 여전히 기존 방식으로 작동한다.
     */
    {
        console.log('클래스');

        class Vacation {

            constructor(destination, length) {
                this.destination = destination;
                this.length = length;
            }

            print() {
                console.log(`${this.destination}은(는) ${this.length}일 걸립니다.`);
            }
        }

        const trip = new Vacation('칠레 산티아고', '7');

        trip.print(); // 칠레 산티아고은(는) 7일 걸립니다.

        // 추상 클래스 확장
        class Expedition extends Vacation {

            constructor(destination, length, gear) {
                super(destination, length)
                this.gear = gear;
            }

            print() {
                super.print();
                console.log(`당신의 ${this.gear.join('와(과) 당신의 ')}를(을) 가져오십시오.`);
            }
        }

        const trip2 = new Expedition('한라산', 3, ['선글라스', '오색 깃발', '카메라']);

        trip2.print(); // 당신의 선글라스와(과) 당신의 오색 깃발와(과) 당신의 카메라를(을) 가져오십시오.
    }

    /**
     * ES6 모듈
     */
    {
        // export const print(message) => log(message, new Date()) ;
        // export const log(message, timestamp) => console.log(`${timestamp.toString()}: ${message}`);

        /**
        * export를 사용해 다른 모듈에서 활용하도록 이름을 외부에 익스포트할 수 있다.
        */

        // const freel = new Expedition('Mt. Freel', 2, ['water', 'snack']);
        // export default freel;

        /**
         * export default는 오직 하나의 이름만 노출하는 모듈에서 사용할 수 있다.
         * 
         * 모듈은 import 명령을 사용해 다른 자바스크립트의 파일을 불러와 사용할 수 있다.
         * export default를 사용해 이름만 노출한 경우에는 노춣된 대상을 구조분해 없이 한 이름으로 부를 수 있다.
         */

        // import { print, log } from './text-helpers'
        // import freel from './mt-freel'

        /**
         * 모듈에서 가져운 대상에 다른 이름을 부여할 수도 있다.
         */

        // improt { print as p, log as l } from './text-helpers'

        /**
         * import * 를 사용하면 다른 모듈에서 가져온 모든 이름을 사용자가 정한 로컬 이름 공간 안에 가둘수 있다.
         */
        
        // import * as fns from './text-helpers'
    }

})();