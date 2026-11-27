const toggleButtons = document.querySelectorAll('.toggle-password');
toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling; //Input nằm trước nút
        const icon = button.querySelector('i'); // Lấy phần tử <i> bên trong nút
        const isHidden = input.type === 'password';

        input.type = isHidden ? 'text' : 'password'; // Chuyển đổi kiểu input
        icon.classList.toggle('fa-eye'); // Thay đổi biểu tượng
        icon.classList.toggle('fa-eye-slash'); // Thay đổi biểu tượng
    })
})

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn gửi form mặc định
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if(password !== confirmPassword) {
        alert('Passwords do not match!');
    }
})

const fields = form.querySelectorAll('[required]');
const circle = document.getElementById('progress-circle');
const text = document.getElementById('progress-text');
const progressBar = document.querySelector('.circle-progress');

const radius = circle.r.baseVal.value;          // 45
const circumference = 2 * Math.PI * radius;     // 282.74

function updateProgress() {
    let filled = 0;
    fields.forEach(field => {
        if (field.value.trim() !== '' && field.checkValidity()) filled++;
    });

    const percent = Math.round((filled / fields.length) * 100);

    circle.style.strokeDashoffset = circumference * (1 - percent / 100);
    text.textContent = percent + '%';
    progressBar.setAttribute('aria-valuenow', percent);
}

form.addEventListener('input', updateProgress);
updateProgress();

const notes = [
    { input: document.getElementById('fullname'), note: document.getElementById('fullname-note') },
    { input: document.getElementById('email'), note: document.getElementById('email-note') },
    { input: document.getElementById('gender'), note: document.getElementById('gender-note') },
    { input: document.getElementById('password'), note: document.getElementById('password-note') },
    { input: document.getElementById('confirm-password'), note: document.getElementById('confirm-password-note') }
]

function updateNotes() {
    notes.forEach(({input, note}) => {
        const ok = input && input.value.trim() !== '' && input.checkValidity();
        note.classList.toggle('checkmark', ok);
    });
}

notes.forEach(({input}) => {
    input.addEventListener('input', updateNotes);
});
updateNotes(); //Chạy một lần để cập nhật trạng thái ban đầu của các ghi chú