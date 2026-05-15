// 从浏览器本地存储读取收藏数据（永久保存，不限制数量）
let myCollections = JSON.parse(localStorage.getItem('myVideoCollections')) || [];

// 给所有收藏按钮添加点击事件
document.querySelectorAll('.collect-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const videoId = this.dataset.id;
        const videoTitle = this.parentElement.querySelector('h3').textContent;

        // 检查是否已收藏
        if (!myCollections.some(item => item.id === videoId)) {
            // 添加到收藏
            myCollections.push({ id: videoId, title: videoTitle });
            localStorage.setItem('myVideoCollections', JSON.stringify(myCollections));
            this.textContent = '已收藏';
            this.classList.add('collected');
            renderCollections();
        } else {
            alert('这个视频已经在你的收藏夹里啦！');
        }
    });
});

// 渲染收藏列表
function renderCollections() {
    const list = document.getElementById('collection-list');
    list.innerHTML = '';
    myCollections.forEach(item => {
        const div = document.createElement('div');
        div.className = 'collection-item';
        div.innerHTML = `
            <span>${item.title}</span>
            <button onclick="removeCollection('${item.id}')" style="background:#ff4757; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">取消收藏</button>
        `;
        list.appendChild(div);
    });
}

// 取消收藏功能
function removeCollection(id) {
    myCollections = myCollections.filter(item => item.id !== id);
    localStorage.setItem('myVideoCollections', JSON.stringify(myCollections));
    renderCollections();
    // 更新对应按钮状态
    const btn = document.querySelector(`.collect-btn[data-id="${id}"]`);
    if (btn) {
        btn.textContent = '收藏';
        btn.classList.remove('collected');
    }
}

// 页面加载时渲染收藏列表
renderCollections();