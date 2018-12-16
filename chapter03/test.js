/**
 * Chapter3
 * 자바스크립트를 활용한 함수형 프로그래밍
 */

(() => {

    /**
     * 함수형이란?
     * 
     * 자바스크립트에서는 함수가 1급시민이기 때문에 함수형 프로그래밍을 지원한다고 할 수 있다.
     * 1급 시민이라는 말은 함수를 정수나 문자열 같은 다른 일반적인 값과 마찬가지로 취급할 수 있다는 뜻이다.
     * 
     * 함수를 변수에 넣을 수 있다.
     * 함수를 객체에 넣을 수 있다.
     * 함수를 배열에 넣을 수 있다.
     * 함수를 다른 함수에 인자로 넘길 수도 있다.
     * 함수가 함수를 반환할 수도 있다.
     */
    {
        var createScream = function (logger) {
            return function (message) {
                logger(message.toUpperCase() + '!!!');
            };
        };

        const scream = createScream(message => console.log(message));

        scream('함수가 함수를 반환할 수도 있습니다.'); // 함수가 함수를 반환할 수도 있습니다.!!!
        scream('createScream은 함수를 반환합니다.'); // CREATESCREAM은 함수를 반환합니다.!!!

        // 함수를 인자로 받거나 함수를 반환하는 함수를 고차 함수라고 부른다.
        // ES6문법을 사용하면 createScream 고차 함수를 화살표 함수로 표현할 수 있다.

        const _createScream = logger => message => logger(message.toUpperCase() + '!!!');

        const _scream = _createScream(message => console.log(message));

        _scream('함수가 함수를 반환할 수도 있습니다.2'); // 함수가 함수를 반환할 수도 있습니다.2!!!
    }

    /**
     * 명령형 프로그래밍과 선언적 프로그래밍 비교
     * 
     * 함수형 프로그래밍은 선언적 프로그래밍(declarative programming)이라는 더 넓은 프로그래밍 패러다임의 한가지다.
     * 선언적 프로그래밍은 필요한 것을 달성하는 과정을 하나하나 기술하는 것보다 필요한 것이 어떤 것인지 기술하는 데 방점을
     * 두고 애플리케이션의 구조를 세워나가는 프로그래밍 스타일이다.
     * 
     * 선언적 프로그래밍을 이해하기 위해 명령형 프로그래밍(imperative programming)과 비교할 것이다. 명령형 프로그
     * 래밍은 코드로 원하는 결과를 달성해 나가는 과정에만 관심을 두는 프로그래밍 스타일이다. 어떤 문자열을 URL에서 사용할
     * 수 있게 만드는 일반적인 작업을 살펴보자. 공백은 URL에서 사용할 수 있는 문자가 아니므로 문자열을 URL에서 사용할 수
     * 있게 만들려면 모든 공백()을 하이픈(-)으로 바꿔야 한다. 우선 명령형 프로그래밍에서 이를 어떻게 달성할 수 있는지 살펴
     * 보자.
     */
    {
        var string = 'This is the midday show with Cheryl Waters';
        var urlFriendly = '';

        for (var i = 0; i < string.length; i++) {
            if (string[i] === '') {
                urlFriendly += '-';
            } else {
                urlFriendly += string[i];
            }
        }

        console.log(urlFriendly);

        // 이런 구조의 프로그램은 우리가 원하는 것을 달성하는 방법에만 신경을 쓴다. for 루프의 if 문을 사용하고 대입 연산자
        // +=를 사용해 값을 설정한다. 코드 자체를 간단히 살펴하는 것만으로는 우리가 즉시 알 수 있는 것이 많지 않다. 명령형
        // 프로그램에서는 코드 안에서 벌어지는 일을 읽는 사람이 더 잘 이해하도록 돕는 주석을 많이 달아주어야 한다.
        
        const _string = 'This is the midday show with Cheryl Waters';
        const _urlFriendly = _string.replace(/ /g, '-');

        console.log(_urlFriendly);

        // 같은 문제를 선언적으로 풀어보자.
        // 여기서는 stirng.replace와 정규식을 사용해서 모든 공백을 하이픈으로 변경한다. string.replace를 사용하면 모든
        // 공백을 하이픈으로 변경하는 자세한 방법은 replace 함수 안에 들어가고, 구체적 절차 대신 replace(치환이라는 뜻)
        // 라는 함수를 사용해 추상적인 개념을 표현한다. 선언적 프로그래밍의 코드 구문은 어떤 일이 발생해야 하는지 기술하고,
        // 실제로 그 작업을 처리하는 방법은 추상화로 아랫단에 감춰진다.
    }

})();