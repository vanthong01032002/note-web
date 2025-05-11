// Lấy các phần tử từ DOM
const saveButton = document.getElementById('save-button');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

// Hàm để tạo tên file duy nhất
const generateFileName = () => {
    const timestamp = new Date().getTime();
    return `note_${timestamp}.txt`;
};

// Hàm để lưu ghi chú vào file
const saveNote = async () => {
    const newNote = noteInput.value.trim();
    if (newNote) {
        try {
            // Yêu cầu quyền truy cập thư mục database
            const dirHandle = await window.showDirectoryPicker({
                id: 'database',
                mode: 'readwrite',
                startIn: 'documents'
            });

            // Tạo file mới
            const fileName = generateFileName();
            const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(newNote);
            await writable.close();

            noteInput.value = ''; // Xóa nội dung trong textarea sau khi lưu
            loadNotes(); // Tải lại danh sách ghi chú
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra khi lưu ghi chú!');
        }
    }
};

// Hàm để tải danh sách ghi chú
const loadNotes = async () => {
    try {
        // Yêu cầu quyền truy cập thư mục database
        const dirHandle = await window.showDirectoryPicker({
            id: 'database',
            mode: 'read',
            startIn: 'documents'
        });

        notesList.innerHTML = '';
        
        // Đọc tất cả các file trong thư mục
        for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file' && entry.name.endsWith('.txt')) {
                const file = await entry.getFile();
                const content = await file.text();
                
                const li = document.createElement('li');
                li.textContent = content;
                notesList.appendChild(li);
            }
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi tải ghi chú!');
    }
};

// Gắn sự kiện click cho nút Lưu
saveButton.addEventListener('click', saveNote);

// Tải ghi chú khi trang được load
window.onload = loadNotes;