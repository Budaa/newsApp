import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image
} from 'react-native';
import { prop } from 'ramda';
import api from './src/api';
import { topHeadlines } from './src/api/endpoints';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  article: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  articleTitle: {
    fontSize: 18
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null
    };
  }

  async componentDidMount() {
    const {
      data: { articles }
    } = await api.get(topHeadlines, { params: { country: 'gb' } });

    this.setState({ articles });
  }

  renderArticle({ item: { title, description, urlToImage } }) {
    return (
      <View style={styles.article}>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text>{description}</Text>
        {urlToImage && (
          <Image
            style={{ height: 200 }}
            source={{ uri: urlToImage }}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }

  render() {
    const { articles } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Text>Open up App.js to start working on your app</Text>
        {articles ? (
          <FlatList
            data={this.state.articles}
            renderItem={this.renderArticle}
            keyExtractor={prop('publishedAt')}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </SafeAreaView>
    );
  }
}
