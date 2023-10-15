interface YoutubeEmbedProps {
  embedId: string;
}

export function YoutubeEmbed({ embedId }: YoutubeEmbedProps) {
  return (
    <div className="video-responsive video">
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="aspect-video w-[350px] md:w-[500px]"
      />
    </div>
  );
}
