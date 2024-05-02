document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('Video-upload');
    const titleInput = document.getElementById('videotitle');
    const videoFileInput = document.getElementById('video-file-input');
    const thumbnailInput = document.getElementById('thumbnail');
    const categoryInputs = document.querySelectorAll('.category-input');
    const descriptionInput = document.getElementById('DescriptionInput');
    const uploadBtn = document.querySelector('#upload-btn button');
    const message = document.getElementById('message');
    const addCategoryBtn = document.getElementById('add-category-btn');
    const categoryList = document.querySelector('.category-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const uploadSuccessful = Math.random() < 0.5;

        if (uploadSuccessful) {
            uploadBtn.style.background = 'green';
            message.style.visibility = 'visible';
            message.textContent = 'Upload Successful';
        } else {
            message.style.visibility = 'visible';
            message.textContent = 'Upload Unsuccessful';
        }
    });

    addCategoryBtn.addEventListener('click', function () {
        const newCategoryInput = document.createElement('input');
        newCategoryInput.type = 'text';
        newCategoryInput.placeholder = 'Enter categories';

        if (categoryList) {
            categoryList.appendChild(newCategoryInput);
        } else {
            console.error('Category list not found');
        }
    });

    descriptionInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });




    function formatData() {
        const videoFileName = videoFileInput.files[0].name; 
    
        const data = {
            user: {
                _id: '662a8683e98e169d3f832617',
                username: 'eeeeeeee',
                password: 'e',
                subscribers: 0,
                about: 'ee',
                banner: '/cloud/images/banner.png',
                profilepic: '/cloud/images/profile-pic.png',
                __v: 0
            },
            video: {
                _id: '662a86ef4d2466afa4738961',
                videotitle: titleInput.value,
                tags: Array.from(categoryInputs).map(input => input.value.trim()).filter(value => value !== ''),
                userid: '662a4390c7b5f1023a9b8882',
                description: descriptionInput.value,
                thumbnail: '/cloud/images/thumbnail2.png',
                video: videoFileName, 
                views: 0,
                __v: 0
            }
        };
    
        return data;
    }
    
    form.addEventListener('submit', event => {
        event.preventDefault();
        const formattedData = formatData();
        console.log(formattedData);
    });
});




