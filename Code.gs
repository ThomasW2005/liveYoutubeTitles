function myFunction()
{
  console.log(formatVideoTitle("Py50Hd11CQk", 250));
}

function formatVideoTitle(videoId, goalViews, blockWidth=10, emptyBlock="░", fullBlock="▓")
{
  var views = getVideoViews(videoId);
  var precentReached = views/goalViews;
  var fullBlockCount = Math.floor(blockWidth*precentReached);
  var progressBarTitle = fullBlock.repeat(fullBlockCount) + emptyBlock.repeat(blockWidth-fullBlockCount) + ` ${(precentReached*100).toFixed(1)}% (${views}) of ${goalViews} views`;
  var ret = setVideoTitle(videoId, progressBarTitle);
  if(ret)
    return `sucsess, now at ${views} views, thats ${precentReached*100} precont of ${goalViews}`;
  else
    return `error: ${ret}`
}

function getVideoViews(videoId)
{
  var video = YouTube.Videos.list("id,statistics", {"id":videoId});
  return video.items[0].statistics.viewCount
}

function setVideoTitle(videoId, title)
{
  var vid = YouTube.Videos.list("id,snippet", {"id":videoId})
  var catId = vid.items[0].snippet.categoryId;
  var content = {
    id: videoId,
    snippet:{
      categoryId:catId,
      title:title
    }
  };
  return YouTube.Videos.update(content, "id,snippet");
}