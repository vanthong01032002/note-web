// Lấy các phần tử từ DOM
const saveButton = document.getElementById('save-button');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Kiểm tra xem có ghi chú đã lưu trong localStorage hay không
const loadNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = '';
    savedNotes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
    });
};

// Lưu ghi chú vào localStorage
const saveNote = () => {
    const newNote = noteInput.value.trim();
    if (newNote) {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        noteInput.value = ''; // Xóa nội dung trong textarea sau khi lưu
        loadNotes(); // Tải lại danh sách ghi chú
    }
};

// Gắn sự kiện click cho nút Lưu
saveButton.addEventListener('click', saveNote);

// Tải ghi chú khi trang được load
window.onload = loadNotes;