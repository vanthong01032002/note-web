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
        if (!Array.isArray(parsedNotes)) {
            localStorage.removeItem('notes');
            return [];
        }
        
        return parsedNotes;
    } catch (error) {
        console.error('Error reading from storage:', error);
        localStorage.removeItem('notes');
        return [];
    }
};

// Hàm để lưu ghi chú
const saveNote = () => {
    const newNote = noteInput.value.trim();
    if (newNote) {
        try {
            const notes = getNotesFromStorage();
            notes.push({
                id: generateId(),
                content: newNote,
                timestamp: new Date().toLocaleString()
            });
            
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            displayNotes();
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Có lỗi xảy ra khi lưu ghi chú!');
        }
    }
};

// Hàm để hiển thị danh sách ghi chú
const displayNotes = () => {
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
                <div class="note-content">${note.content || ''}</div>
                <div class="note-time">${note.timestamp || 'Không có thời gian'}</div>
            `;
            notesList.appendChild(li);
        });
    } catch (error) {
        console.error('Error displaying notes:', error);
        notesList.innerHTML = '<li class="error-note">Có lỗi xảy ra khi hiển thị ghi chú</li>';
    }
};

// Gắn sự kiện click cho nút Lưu
saveButton.addEventListener('click', saveNote);

// Hiển thị ghi chú khi trang được load
window.onload = displayNotes;