import {merge} from 'lodash'
import User from '../api/user/model'
import Post from '../api/post/model'
import Category from '../api/category/model'

console.log('Seeding the Database')

const users = [
  {username: 'Jimmylo', password: 'test'},
  {username: 'Xoko', password: 'test'},
  {username: 'katamon', password: 'test'}
]

const categories = [
  {name: 'intros'},
  {name: 'angular'},
  {name: 'UI/UX'}
]

const posts = [
  {title: 'Learn angular 2 today', text: 'Angular to is so dope'},
  {title: '10 reasons you should love IE7', text: 'IE7 is so amazing'},
  {title: 'Why we switched to Go', text: 'go is dope'}
]

const createDoc = (Model, doc) => {
  return new Promise((resolve, reject) => {
    new Model(doc).save((err, saved) => {
      return err ? reject(err) : resolve(saved)
    })
  })
}

const cleanDB = () => {
  console.log('... cleaning the DB')
  var cleanPromises = [User, Category, Post].map((model) => model.remove().exec())
  return Promise.all(cleanPromises)
}

const createUsers = (data) => {
  var promises = users.map((user) => createDoc(User, user))
  return Promise.all(promises).then((users) => merge({users: users}, data || {}))
}

const createCategories = (data) => {
  var promises = categories.map((category) => createDoc(Category, category))
  return Promise.all(promises).then((categories) => merge({categories: categories}, data || {}))
}

const createPosts = (data) => {
  const addCategory = (post, category) => {
    post.categories.push(category)
    return new Promise((resolve, reject) => {
      post.save((err, saved) => err ? reject(err) : resolve(saved))
    })
  }

  const newPosts = posts.map((post, i) => {
    post.author = data.users[i]._id
    return createDoc(Post, post)
  })

  return Promise.all(newPosts).then((savedPosts) => {
    return Promise.all(savedPosts.map((post, i) => {
      return addCategory(post, data.categories[i])
    }))
  }).then(() => 'Seeded DB with 3 Posts, 3 Users, 3 Categories')
}

cleanDB()
  .then(createUsers)
  .then(createCategories)
  // .then(createPosts)
  .then(console.log.bind(console))
  .catch(console.log.bind(console))
