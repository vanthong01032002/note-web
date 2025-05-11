// Lấy các phần tử từ DOM
const saveButton = document.getElementById('save-button');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Hàm để tạo ID duy nhất
const generateId = () => {
    return Date.now().toString();
};

// Hàm để lấy danh sách ghi chú từ localStorage
const getNotesFromStorage = () => {
    try {
        const notes = localStorage.getItem('notes');
        if (!notes) return [];
        
        const parsedNotes = JSON.parse(notes);
        if (!Array.isArray(parsedNotes)) return [];
        
        return parsedNotes;
    } catch (error) {
        console.error('Lỗi khi đọc dữ liệu:', error);
        return [];
    }
};

// Hàm để lưu ghi chú
const saveNote = () => {
    const newNote = noteInput.value.trim();
    if (newNote) {
        try {
            // Lấy danh sách ghi chú hiện tại
            const notes = getNotesFromStorage();
            
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
            console.error('Lỗi khi lưu ghi chú:', error);
            alert('Có lỗi xảy ra khi lưu ghi chú!');
        }
    }
};

// Hàm để tải danh sách ghi chú
const loadNotes = () => {
    try {
        const notes = getNotesFromStorage();
        notesList.innerHTML = '';
        
        if (notes.length === 0) {
            notesList.innerHTML = '<li class="empty-note">Chưa có ghi chú nào</li>';
            return;
        }
        
        notes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="note-content">${note.content}</div>
                <div class="note-time">${note.timestamp}</div>
            `;
            notesList.appendChild(li);
        });
    } catch (error) {
        console.error('Lỗi khi tải ghi chú:', error);
        notesList.innerHTML = '<li class="error-note">Có lỗi xảy ra khi tải ghi chú</li>';
    }
};

// Gắn sự kiện click cho nút Lưu
saveButton.addEventListener('click', saveNote);

// Tải ghi chú khi trang được load
window.onload = loadNotes;