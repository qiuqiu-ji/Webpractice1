document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.querySelector('.upload-btn');
    const previewSection = document.querySelector('.preview-section');
    const originalImage = document.getElementById('originalImage');
    const compressedImage = document.getElementById('compressedImage');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const downloadBtn = document.getElementById('downloadBtn');

    let currentFile = null;

    // 处理拖放事件
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // 添加拖放效果
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
        });
    });

    // 处理文件拖放
    dropZone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });

    // 处理点击上传
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    // 处理图片文件
    function handleFile(file) {
        currentFile = file;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            originalImage.src = e.target.result;
            originalSize.textContent = formatFileSize(file.size);
            previewSection.style.display = 'block';
            compressImage(e.target.result, qualitySlider.value);
        };

        reader.readAsDataURL(file);
    }

    // 压缩图片
    function compressImage(src, quality) {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 保持原始宽高比
            canvas.width = img.width;
            canvas.height = img.height;

            // 绘制图片
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            // 压缩图片
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
            compressedImage.src = compressedDataUrl;

            // 计算压缩后的大小
            const compressedSize = Math.round((compressedDataUrl.length - 'data:image/jpeg;base64,'.length) * 3/4);
            document.getElementById('compressedSize').textContent = formatFileSize(compressedSize);
        };
    }

    // 质量滑块事件
    qualitySlider.addEventListener('input', (e) => {
        const quality = e.target.value;
        qualityValue.textContent = quality + '%';
        if (originalImage.src) {
            compressImage(originalImage.src, quality);
        }
    });

    // 下载按钮事件
    downloadBtn.addEventListener('click', () => {
        if (compressedImage.src) {
            const link = document.createElement('a');
            link.download = 'compressed-' + (currentFile ? currentFile.name : 'image.jpg');
            link.href = compressedImage.src;
            link.click();
        }
    });

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}); 