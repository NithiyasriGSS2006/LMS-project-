import React, { useRef, useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter name');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handlelecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };

  const addlecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (currentChapterId === chapter.chapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto my-6">
      <form onSubmit={HandleSubmit}>
        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Course Title</p>
          <input
            className="w-full p-2 border rounded"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Course Description</p>
          <div ref={editorRef} className="h-40 border rounded" />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Course Price</p>
          <input
            className="w-full p-2 border rounded"
            onChange={(e) => setCoursePrice(e.target.value)}
            value={coursePrice}
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Course Thumbnail</p>
          <label
            htmlFor="thumbnailImage"
            className="cursor-pointer flex items-center gap-3 border p-2 rounded"
          >
            <img src={assets.file_upload_icon} alt="upload" className="w-6 h-6" />
            <span>Upload Image</span>
            <input
              type="file"
              id="thumbnailImage"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
          {image && (
            <img
              className="max-h-20 mt-2"
              src={URL.createObjectURL(image)}
              alt="thumbnail"
            />
          )}
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold mb-1">Discount %</p>
          <input
            type="number"
            min={0}
            max={100}
            className="w-full p-2 border rounded"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            required
          />
        </div>

        <div className="mb-6">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="border rounded mb-4 p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    className={`transform ${
                      chapter.collapsed ? '' : 'rotate-90'
                    } cursor-pointer`}
                    alt="toggle"
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{chapter.chapterContent.length} lectures</span>
                  <img
                    src={assets.cross_icon}
                    alt="remove"
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {!chapter.collapsed && (
                <div className="ml-4 mt-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{' '}
                        {lecture.lectureDuration} mins -{' '}
                        <a
                          className="text-blue-600 underline"
                          href={lecture.lectureUrl}
                        >
                          Link
                        </a>{' '}
                        - {lecture.isPreviewFree ? 'Free' : 'Paid'}
                      </span>
                      <img
                        src={assets.cross_icon}
                        alt="remove"
                        onClick={() =>
                          handlelecture('remove', chapter.chapterId, lectureIndex)
                        }
                        className="cursor-pointer w-4 h-4"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handlelecture('add', chapter.chapterId)}
                    className="text-blue-600 mt-2 underline"
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleChapter('add')}
            className="text-green-600 font-semibold mt-4"
          >
            + Add Chapter
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-xl font-semibold mb-4">Add Lecture</h2>

              <div className="mb-3">
                <p className="font-medium">Lecture Title</p>
                <input
                  type="text"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => {
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-3">
                <p className="font-medium">Duration (minutes)</p>
                <input
                  type="number"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => {
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-3">
                <p className="font-medium">Lecture URL</p>
                <input
                  type="text"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => {
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    });
                  }}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) => {
                    setLectureDetails({
                      ...lectureDetails,
                      isPreviewFree: e.target.checked,
                    });
                  }}
                  className="w-4 h-4"
                />
                <label className="font-medium">Is preview free?</label>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={addlecture}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
                <img
                  src={assets.cross_icon}
                  alt="close"
                  onClick={() => setShowPopup(false)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ADD COURSE
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
