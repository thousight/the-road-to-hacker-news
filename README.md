# The Road to Learn React follow through
Going through [The Road to Learn React](https://github.com/the-road-to-learn-react/the-road-to-learn-react) and get the hands on code stored at this repo

### Things I do differently from the book
- The book kinda put everything together into App.jsx, while I divided up the components into files and put some strings into a singleton
- Some function names are different, for example, fetchSearchTopStories() in App.jsx is called handleHackerNewsFetch() in my case
- In the pagination API search section of the book, it uses a button to fetch more items, while I used [react-visibility-sensor](https://github.com/joshwnj/react-visibility-sensor) to enable infinite scroll instead. And because of this change, I got rid of the API fetch call at componentDidMount() because react-visibility-sensor will call it at render()
