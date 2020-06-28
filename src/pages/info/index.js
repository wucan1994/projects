import React from 'react';
import HttpClient from '../../common/httpClient';
import config from '../../config/index';
import './index.css';

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.fileInput = React.createRef();
    this.selectFile = this.selectFile.bind(this);
    this.submitFile = this.submitFile.bind(this);
    this.state = {
      imageList: [],
    };
  }

  selectFile() {
    const { files } = this.fileInput.current;
    const imgList = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const imageType = /^image\//;

      if (imageType.test(file.type)) {
        const img = {};
        img.file = file;
        const reader = new FileReader();
        reader.onload = ((item) => {
          return (e) => {
            item.src = e.target.result;
            imgList.push(item);
            if (i === files.length - 1) {
              this.setState({
                imageList: imgList,
              });
            }
          };
        })(img);
        reader.readAsDataURL(file);
      }
    }
  }

  submitFile(e) {
    e.preventDefault();

    const formData = new FormData(this.form.current);

    HttpClient.request({
      url: `${config.REMOTE_SERVER}/header`,
      method: 'post',
      data: formData,
      success: (res) => {
        console.log('success', res);
      },
      fail: () => {},
    });
  }

  render() {
    const { imageList } = this.state;
    return (
      <div>
        <form onSubmit={this.submitFile} ref={this.form}>
          {/* 可以用这种写法，但是发送表单请求时，会跳转到新的页面，需要处理这种情况
          <form
          action={`${config.REMOTE_SERVER}/header`}
          method="post"
          encType="multipart/form-data"
          > */}
          <input
            type="file"
            name="header"
            ref={this.fileInput}
            multiple
            onChange={(e) => this.selectFile(e)}
          />
          <input type="submit" value="提交" />
        </form>
        {imageList.map((item) => {
          return (
            <img
              src={item.src}
              file={item.file}
              className="Info-image-small"
              alt=""
              key={item.file.name}
            />
          );
        })}
      </div>
    );
  }
}

export default Info;
