import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

class BlogList extends Component {
  state = {blogsDataList: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const formattedData = data.map(eachBlog => ({
      id: eachBlog.id,
      title: eachBlog.title,
      imageUrl: eachBlog.image_url,
      avatarUrl: eachBlog.avatar_url,
      author: eachBlog.author,
      topic: eachBlog.topic,
    }))

    this.setState({blogsDataList: formattedData, isLoading: false})
  }

  render() {
    const {blogsDataList, isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          blogsDataList.map(each => <BlogItem key={each.id} blogData={each} />)
        )}
      </div>
    )
  }
}

export default BlogList
