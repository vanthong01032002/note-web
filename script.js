// Lấy các phần tử từ DOM
const saveButton = document.getElementById('save-button');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Hàm để tạo ID duy nhất
const generateId = () => {
    return Date.now().toString();
};

// Hàm để lưu ghi chú
const saveNote = () => {
    const newNote = noteInput.value.trim();
    if (newNote) {
        try {
            // Lấy danh sách ghi chú hiện tại
            const notes = JSON.parse(localStorage.getItem('notes') || '[]');
            
            // Thêm ghi chú mới
            notes.push({
                id: generateId(),
                content: newNote,
                timestamp: new Date().toLocaleString()
            });
            
            // Lưu lại vào localStorage
            localStorage.setItem('notes', JSON.stringify(notes));
            
            noteInput.value = ''; // Xóa nội dung trong textarea sau khi lưu
            loadNotes(); // Tải lại danh sách ghi chú
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra khi lưu ghi chú!');
        }
    }
};

// Hàm để tải danh sách ghi chú
const loadNotes = () => {
    try {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notesList.innerHTML = '';
        
        notes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="note-content">${note.content}</div>
                <div class="note-time">${note.timestamp}</div>
            `;
            notesList.appendChild(li);
        });
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi tải ghi chú!');
    }
};

// Gắn sự kiện click cho nút Lưu
saveButton.addEventListener('click', saveNote);

// Tải ghi chú khi trang được load
window.onload = loadNotes;