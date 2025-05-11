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
        console.log('Raw notes from storage:', notes);
        
        if (!notes) {
            console.log('No notes found in storage');
            return [];
        }
        
        const parsedNotes = JSON.parse(notes);
        console.log('Parsed notes:', parsedNotes);
        
        if (!Array.isArray(parsedNotes)) {
            console.log('Notes is not an array, resetting to empty array');
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
            // Lấy danh sách ghi chú hiện tại
            const notes = getNotesFromStorage();
            console.log('Current notes before save:', notes);
            
            // Thêm ghi chú mới
            const newNoteObj = {
                id: generateId(),
                content: newNote,
                timestamp: new Date().toLocaleString()
            };
            console.log('New note to be added:', newNoteObj);
            
            notes.push(newNoteObj);
            
            // Lưu lại vào localStorage
            const notesString = JSON.stringify(notes);
            console.log('Saving notes to storage:', notesString);
            localStorage.setItem('notes', notesString);
            
            noteInput.value = ''; // Xóa nội dung trong textarea sau khi lưu
            loadNotes(); // Tải lại danh sách ghi chú
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Có lỗi xảy ra khi lưu ghi chú!');
        }
    }
};

// Hàm để tải danh sách ghi chú
const loadNotes = () => {
    try {
        console.log('Loading notes...');
        const notes = getNotesFromStorage();
        console.log('Notes loaded:', notes);
        
        notesList.innerHTML = '';
        
        if (notes.length === 0) {
            console.log('No notes to display');
            notesList.innerHTML = '<li class="empty-note">Chưa có ghi chú nào</li>';
            return;
        }
        
        notes.forEach((note, index) => {
            try {
                console.log(`Processing note ${index}:`, note);
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="note-content">${note.content || ''}</div>
                    <div class="note-time">${note.timestamp || 'Không có thời gian'}</div>
                `;
                notesList.appendChild(li);
            } catch (noteError) {
                console.error(`Error processing note ${index}:`, noteError);
            }
        });
    } catch (error) {
        console.error('Error loading notes:', error);
        notesList.innerHTML = '<li class="error-note">Có lỗi xảy ra khi tải ghi chú</li>';
    }
};

// Gắn sự kiện click cho nút Lưu
saveButton.addEventListener('click', saveNote);

// Tải ghi chú khi trang được load
window.onload = () => {
    try {
        console.log('Page loaded, initializing...');
        loadNotes();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
};