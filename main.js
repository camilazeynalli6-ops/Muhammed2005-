function checkPassword() {
    const pass = document.getElementById("password").value;
    const music = document.getElementById("bgMusic");
    const loginSection = document.getElementById("loginSection");
    const heartBeats = document.getElementById("heartBeats");
    const questions = document.getElementById("questions");

    if (pass === "2005") {
        loginSection.style.display = "none";
        heartBeats.style.display = "flex";

        music.volume = 0.4;
        music.play();

        setTimeout(() => {
            heartBeats.style.display = "none";
            questions.style.display = "block";
        }, 5000);
    } else {
        alert("Səhv şifrə!");
    }
}

let noButtonDodgeCount = 0;
const maxDodges = 5;

function nextQuestion(accepted, questionNumber) {
    if (accepted) {
        const currentQuestion = document.querySelector(`#q${questionNumber}`);
        if (currentQuestion) {
            currentQuestion.classList.remove('active');
        }

        if (questionNumber < 3) {
            const nextQuestion = document.querySelector(`#q${questionNumber + 1}`);
            if (nextQuestion) {
                nextQuestion.classList.add('active');
            }
        } else {
            const finalQuestion = document.querySelector('#final');
            if (finalQuestion) {
                finalQuestion.classList.add('active');
                celebrateAcceptance();
            }
        }
    }
}

function handleNo() {
    if (noButtonDodgeCount >= maxDodges) {
        document.querySelectorAll('.question')
            .forEach(q => q.classList.remove('active'));

        const rejected = document.querySelector('#rejected');
        if (rejected) rejected.classList.add('active');

        const heart = document.querySelector('.heart');
        if (heart) heart.style.display = 'none';

        const brokenHeart = document.querySelector('.broken-heart');
        if (brokenHeart) brokenHeart.style.display = 'block';
    }
}

function dodgeNo() {
    if (noButtonDodgeCount < maxDodges) {
        const btn = document.querySelector('.btn.no');
        if (btn) {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 100 - 50;

            btn.style.transform = `translate(${x}px, ${y}px)`;
            noButtonDodgeCount++;
        }
    }
}

function resetQuestions() {
    document.querySelectorAll('.question')
        .forEach(q => q.classList.remove('active'));

    const q1 = document.querySelector('#q1');
    if (q1) q1.classList.add('active');

    const heart = document.querySelector('.heart');
    if (heart) heart.style.display = 'block';

    const brokenHeart = document.querySelector('.broken-heart');
    if (brokenHeart) brokenHeart.style.display = 'none';

    noButtonDodgeCount = 0;

    const noBtn = document.querySelector('.btn.no');
    if (noBtn) noBtn.style.transform = 'none';
}

function celebrateAcceptance() {
    const container = document.querySelector('.floating-hearts');
    if (container) {
        for (let i = 0; i < 15; i++) {
            createHeart(container);
        }
    }


    setTimeout(startCanvasAnimation, 3000);
}

function createHeart(container) {
    const heart = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    heart.setAttribute('viewBox', '0 0 100 100');
    heart.style.width = '30px';
    heart.style.height = '30px';
    heart.style.position = 'absolute';
    heart.style.left = `${Math.random() * 100}%`;

    const duration = 3 + Math.random() * 3;
    heart.style.animation = `float ${duration}s linear infinite`;

    const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

    path.setAttribute(
        'd',
        'M50 88.9L16.7 55.6C7.2 46.1 7.2 30.9 16.7 21.4s24.7-9.5 34.2 0L50 20.5l-0.9 0.9c9.5-9.5 24.7-9.5 34.2 0s9.5 24.7 0 34.2L50 88.9z'
    );

    const hue = Math.random() * 60 + 330;
    path.style.fill = `hsl(${hue}, 100%, 65%)`;

    heart.appendChild(path);
    container.appendChild(heart);

    setTimeout(() => {
        if (container.contains(heart)) {
            container.removeChild(heart);
        }
    }, 6000);
}

function startCanvasAnimation() {
    const questions = document.getElementById("questions");
    if (questions) {
        questions.style.display = "none";
    }


    var c = document.getElementById('alx');
    var b = document.body;
    var a = c.getContext('2d');

    e = [];
    h = [];
    WIDTH = c.width = innerWidth;
    HEIGHT = c.height = innerHeight;
    v = 32 + 16 + 8;
    R = Math.random;
    C = Math.cos;
    Y = 6.3;

    for (i = 0; i < Y; i += 0.2)
        h.push([WIDTH / 2 + 210 * Math.pow(Math.sin(i), 3),
        HEIGHT / 2 + 13 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))]);

    for (i = 0; i < Y; i += 0.4)
        h.push([WIDTH / 2 + 150 * Math.pow(Math.sin(i), 3),
        HEIGHT / 2 + 9 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))]);

    for (i = 0; i < Y; i += 0.8)
        h.push([WIDTH / 2 + 90 * Math.pow(Math.sin(i), 3),
        HEIGHT / 2 + 5 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))]);

    for (i = 0; i < v;) {
        x = R() * WIDTH;
        y = R() * HEIGHT;
        H = 80 * (i / v) + Math.random() * 100;
        S = 40 * R() + 60;
        B = 60 * R() + 20;
        f = [];
        for (k = 0; k < v;) f[k++] = {
            x: x,
            y: y,
            X: 0,
            Y: 0,
            R: 1 - k / v + 1,
            S: R() + 1,
            q: ~~(R() * v),
            D: 2 * (i % 2) - 1,
            F: 0.2 * R() + 0.7,
            f: "hsla(" + ~~H + "," + ~~S + "%," + ~~B + "%,.1)"
        };
        e[i++] = f
    }

    function path(d) {
        a.fillStyle = d.f;
        a.beginPath();
        a.arc(d.x, d.y, d.R, 0, Y, 1);
        a.closePath();
        a.fill()
    }

    setInterval(function () {
        a.fillStyle = "rgba(0,0,0,.2)";
        a.fillRect(0, 0, WIDTH, HEIGHT);
        for (i = v; i--;) {
            f = e[i];
            u = f[0];
            q = h[u.q];
            D = u.x - q[0];
            E = u.y - q[1];
            G = Math.sqrt(D * D + E * E);
            10 > G && (0.95 < R() ? u.q = ~~(R() * v) : (0.99 < R() && (u.D *= -1), u.q += u.D, u.q %= v, 0 > u.q && (u.q += v)));
            u.X += -D / G * u.S;
            u.Y += -E / G * u.S;
            u.x += u.X;
            u.y += u.Y;
            path(u);
            u.X *= u.F;
            u.Y *= u.F;
            for (k = 0; k < v - 1;) T = f[k], N = f[++k], N.x -= 0.7 * (N.x - T.x), N.y -= 0.7 * (N.y - T.y), path(N)
        }
    }, 25);
}