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
        // 같은 문제를 선언적으로 풀어보자.

        const _string = 'This is the midday show with Cheryl Waters';
        const _urlFriendly = _string.replace(/ /g, '-');

        console.log(_urlFriendly);

        // 여기서는 stirng.replace와 정규식을 사용해서 모든 공백을 하이픈으로 변경한다. string.replace를 사용하면 모든
        // 공백을 하이픈으로 변경하는 자세한 방법은 replace 함수 안에 들어가고, 구체적 절차 대신 replace(치환이라는 뜻)
        // 라는 함수를 사용해 추상적인 개념을 표현한다. 선언적 프로그래밍의 코드 구문은 어떤 일이 발생해야 하는지 기술하고,
        // 실제로 그 작업을 처리하는 방법은 추상화로 아랫단에 감춰진다.
        // 선언적 프로그램은 코드 자체가 어떤 일이 벌어질지 설명하기 때문에 좀 더 추론하기 쉽다.
        // 선언적 접근 방식이 더 읽기 쉽고, 그래서 더 추론하기 쉽다. 각 함수가 어떻게 구현되었는지는 함수라는 추상화 아래에
        // 감춰진다.

        // 근본적으로 선언적 프로그래밍은 추론하기 쉬운 애플리케이션을 만들어내며, 애플리케이션에 대한 추론이 쉬우면 그 애
        // 플리케이션의 규모를 확장하는 것도 더 쉽기 마련이다.

        // 이제 문서 객체 모델을 만드는 과정을 살펴보자. 명령형 접근 방식은 다음과 같이 DOM을 구축하는 절차와 관련 있다.

        // var target = document.getElementById('target');
        // var wapper = document.createElement('div');
        // var headline = document.createElement('h1');

        // wapper.id = 'welcome';
        // headline.innerText = 'Hello world';

        // wapper.appendChild(headline);
        // target.appendChild(wapper);

        // 이 코드 앨리먼트를 만들고, 설정하고, 문서에 추가한다. 이런 식으로 DOM이 구축된 1만줄 정도 되는 코드를 변경하거
        // 나 새로운 기능을 추가하거나 규모를 확장하는 것은 아주 어려운 일이다.

        // 이제 리액트 컴포넌트를 사용해 DOM을 선언적으로 구성하는 방법을 살펴보자.

        // const { render } = ReactDOM;

        // const Welcome = () => (
        //     <div id="welcome">
        //         <h1>Hello World</h1>
        //     </div>
        // );

        // render(
        //     <Welcome />,
        //     document.getElementById('target')
        // );

        // 리액트는 선언적이다. 이 과정에서 실제 DOM이 어떻게 렌더링되는지에 대한 내용은 추상화로 사라진다. 이 코드를 보면
        // Welcome 컴포넌트를 ID가 target인 엘리먼트 안에 렌더링하고 샆어 하는 의도가 명확히 드러난다.
    }

    /**
     * 함수형 프로그래밍의 개념
     */
    {
        /**
         * 불변성
         * 
         * mutate는 변한다는 뜻이다. 따라서 immutable은 변할 수 없다는 뜻이다. 함수형 프로그래밍에서는 데이터가 변할
         * 수 없다. 불변성 데이터는 결코 바뀌지 않는다.
         * 
         * 원본 데이터 구조를 변경하는 대신 그 데이터 구조의 복사본을 만들고 그중 일부를 변경한다. 그리고 원본 대신 변경한
         * 복사본을 사용해 필요한 작업을 진행한다.
         * 
         * 불변성이 어떻게 작동하는지 이해하기 위해 데이터를 변경한다는 것이 어떤 의미인지 살펴보자.
         */
        {
            {
                let color_lawn = {
                    title: '잔디',
                    color: '#00FF00',
                    rating: 0
                };

                // 다음과 같이 색에 평점을 매기는 함수를 만든다. 이 함수는 넘겨받은 color 객체의 rating을 변경한다.
                function rateColor(color, rating) {
                    color.rating = rating;
                    return color;
                }

                console.log(rateColor(color_lawn, 5).rating); // 5
                console.log(color_lawn.rating); // 5
            }

            // 자바스크립트에서 함수의 인자는 실제 데이터에 대한 참조다.
            // rateColor를 다음과 같이 고쳐 쓰면 원본에는 아무런 해가 없이 색깔에 평점을 부여할 수 있다.

            {
                let color_lawn = {
                    title: '잔디',
                    color: '#00FF00',
                    rating: 0
                };

                var _rateColor = function (color, rating) {
                    return Object.assign({}, color, {
                        rating: rating
                    });
                };

                console.log(_rateColor(color_lawn, 5).rating);
                console.log(color_lawn.rating);
            }

            // 색의 이름으로 이루어진 배열을 생각해보자.

            {
                let colorArray = [{ title: '과격한 빨강' }, { title: '잔디' }, { title: '파티 핑크' } ];

                // 이 배열에 Array.push를 사용해 색을 추가하는 함수를 작성할 수 있다.

                var addColor = function (title, colors) {
                    colors.push({ title: title });
                    return colors;
                };

                console.log(addColor('매력적인 초록', colorArray).length); // 4
                console.log(colorArray.length); // 4

                // 하지만 Array.push는 불편성 함수가 아니다. 원래의 colorArray 배열을 변화시키지 않고
                // 유지하기 위해서는 Array.concat을 사용해야 한다.

                let _colorArray = [{ title: '과격한 빨강' }, { title: '잔디' }, { title: '파티 핑크' } ];

                const _addColor = (title, array) => array.concat({ title });

                console.log(_addColor('매력적인 초록', _colorArray).length); // 4
                console.log(_colorArray.length); // 3

                // 배열 스프레드 연산자를 사용해 배열을 복사할 수 있다.

                const __addColor = (title, list) => [...list, { title }];

                console.log(__addColor('매력적인 초록', _colorArray).length); // 4
                console.log(_colorArray.length); // 3

                // 이 함수는 원본 리스트의 원소를 새로운 배열에 복사하고, title 파라미터로 받은 값을 title 프로퍼티로
                // 하는 객체를 새 배열 뒤에 추가한다. 이 함수는 인자로 받은 list를 변경하지 않기 때문에 list의 원본인
                // colorArray의 불변성을 지켜준다.
            }
        }

        /**
         * 순수 함수
         * 
         * 순수 함수(pure function)는 파라미터에 의해서만 반환값이 결정되는 함수를 뜻한다. 순수 함수는 최소 하나 이상의
         * 인자를 받고, 인자가 같으면 항상 같은 값이나 함수를 반환한다. 순수 함수에는 부수 효과가 없다. 부수 효과란 전역 변
         * 수를 설정하거나, 함수 내부나 애플리케이션에 있는 다른 상태를 변경하는 것을 말한다. 순수 함수는 인자를 변경 불가능
         * 한 데이터로 취급한다.
         */
        {
            // 순수 함수를 이해하기 위해 먼저 순수하지 않은 함수를 하나 살펴보자.

            {
                var frederick = {
                    name: 'Fredrick Douglass',
                    canRead: false,
                    canWrite: false
                };

                function selfEducate() {
                    frederick.canRead = true;
                    frederick.canWrite = true;
                    return frederick;
                }

                selfEducate();
                console.log(frederick); // {name: "Fredrick Douglass", canRead: true, canWrite: true}
            }

            // selfEducate 함수는 순수하지 않다. 이 함수는 인자를 취하지 않으며, 값을 반환하거나 함수를 반환하지 않는다.
            // 또한 자신의 영역 밖에 있는 frederick이라는 변수를 바꾸기까지 한다.
            // selfEducate 함수가 호출되면 뭔가를 바꾼다. 즉, 함수 호출에 따른 부수 효과가 발생한다.

            // 이제 selfEducate가 파라미터를 받게 만들자.

            {
                var _frederick = {
                    name: 'Fredrick Douglass',
                    canRead: false,
                    canWrite: false
                };

                const _selfEducate = person => {
                    person.canRead = true;
                    person.canWrite = true;
                    return person;
                };

                console.log(_selfEducate(_frederick));  // {name: "Fredrick Douglass", canRead: true, canWrite: true}
                console.log(_frederick); // {name: "Fredrick Douglass", canRead: true, canWrite: true}

                // 파라미터를 받기는 하지만, 이 selfEducate 함수도 순수하지 않다. 이 함수에도 부수 효과가 있기 때문이다.
                // 이 함수를 호출하면 인자로 넘긴 객체의 필드가 바뀐다. 이 함수에 전달된 객체를 불변 데이터로 취급한다면
                // 순수 함수를 얻을 수 있을 것이다.
            }
            
            // 받은 파라미터를 변경하지 않도록 함수 본문을 다시 작성하자.

            {
                var __frederick = {
                    name: 'Fredrick Douglass',
                    canRead: false,
                    canWrite: false
                };   

                const __selfEducate = person => Object.assign({}, person, { canRead: true, canWrite: true });

                console.log(__selfEducate(__frederick)); // {name: "Fredrick Douglass", canRead: false, canWrite: false}
                console.log(__frederick); // {name: "Fredrick Douglass", canRead: true, canWrite: true}
            }

            // 마침내 selfEducate가 순수 함수가 되었다.

            // 이제 DOM을 변경하는 순수하지 않은 함수를 살펴보자.

            {
                function Header(text) {
                    let h1 = document.createElement('h1');
                    h1.innerText = text;
                    document.body.appendChild(h1);
                }   
                
                Header('Header() caused side effects');
            }

            // Header 함수는 머리글을 만든다. 이 함수는 인자로 받은 텍스트를 머리글에 넣는다. 이 함수는 순수하지 않다. 이 함수는 함수나 값을
            // 반환하지 않으며 DOM을 변경하는 부수 효과를 발생시킨다.

            // 리액트에서는 UI를 순수 함수로 표현한다. 다음 예제에서 함수는 엘리먼트를 만드는 일만 책임지며, DOM을 변경하는 책임은 애플리케
            // 이션의 다른 부분이 담당해야 한다.

            {
                const Header = props => '<h1>{props.title}</h1>';
            }

            // 순수 함수는 함수형 프로그래밍의 또 다른 핵심 개념이다. 순수 함수를 사용하면 애플리케이션의 상태에 영향을 미치지 않기 때문에 코딩이
            // 편해진다. 함수를 만들 때 다음 세 가지 규칙을 따르면 순수 함수를 만들 수 있다.
            // 1. 순수 함수는 파라미터를 최소 하나 이상 받아야 한다.
            // 2. 순수 함수는 값이나 다른 함수를 반환해야 한다.
            // 3. 순수 함수는 인자나 함수 밖에 있는 다른 변수를 변경하거나 입출력을 수행해서는 안 된다.            
        }
    }

})();