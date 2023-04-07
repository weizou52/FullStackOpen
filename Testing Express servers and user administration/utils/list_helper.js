const dummy = (blogs) => {
  return 1
}

const totalLikes=(blogs)=>{
  let ans=0
  for (let i=0; i<blogs.length;i++){
    ans+=blogs[i].likes
  }
  return ans
}

module.exports = {
  dummy,totalLikes
}