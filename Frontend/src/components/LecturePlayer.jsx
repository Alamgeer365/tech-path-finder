const LecturePlayer = ({ video }) => {

  const videoId = video.split("v=")[1];

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl">

      <iframe
        src={embedUrl}
        title="Lecture"
        className="w-full h-full"
        allowFullScreen
      />

    </div>
  );
};

export default LecturePlayer;