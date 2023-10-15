interface YoutubeEmbedProps {
  embedId: string;
}

export function YoutubeEmbed({ embedId }: YoutubeEmbedProps) {
  return (
    <div className="video-responsive">
      <iframe
        width="500"
        height="300"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
