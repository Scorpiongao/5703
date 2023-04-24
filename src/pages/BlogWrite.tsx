import React, { useState, FC } from 'react';
import { Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 导入 Quill.js 的样式

interface RichTextEditorProps {
    onChange?: (content: string, html: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ onChange }) => {
    const handleChange = (content: string, _delta: any, _source: any, editor: any) => {
        if (onChange) {
            onChange(content, editor.getHTML());
        }
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['blockquote', 'code-block'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    };

    const formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'header', 'list', 'bullet', 'indent',
        'script', 'size', 'direction', 'font', 'color', 'background', 'align',
        'code-block'
    ];

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={handleChange}
        />
    );
};

const BlogWrite: React.FC = () => {
    const [content, setContent] = useState<string>('');

    const handleRichTextChange = (newContent: string, _html: string) => {
        setContent(newContent);
    };

    const handleSubmit = () => {
        console.log('提交的内容：', content);
    };

    return (
        <div>
            <RichTextEditor onChange={handleRichTextChange} />
            <Button onClick={handleSubmit}>提交</Button>
        </div>
    );
};

export default BlogWrite;
