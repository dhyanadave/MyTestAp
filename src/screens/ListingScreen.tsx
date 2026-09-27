import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import AppHeader from '../components/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sizeWidth } from '../utils/utils';
import { useTheme } from '../context/ThemeContext';
import strings from '../constants/strings';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const ListingScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const fetchProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const url = `https://dummyjson.com/products/`;
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <AppHeader title={strings.listing.title} />
      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <ProductCard item={item} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '48%',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: sizeWidth(10),
  },
});
