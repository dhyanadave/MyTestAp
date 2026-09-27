import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sizeHeight, sizeWidth } from '../utils/utils';
import { useTheme } from '../context/ThemeContext';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={[styles.productImage, {backgroundColor: colors.imgBackground}]} />

      <Text
        numberOfLines={1}
        style={[
          styles.productName,
          {
            color: colors.text,
          },
        ]}
      >
        {item.title}
      </Text>

      <Text
        style={[
          styles.price,
          {
            color: colors.primary,
          },
        ]}
      >
        ${item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  productImage: {
    height: sizeHeight(230),
    borderRadius: sizeWidth(10),
    marginVertical: sizeHeight(15),
  },
  productName: {
    fontSize: sizeWidth(18),
    fontWeight: '500',
  },
  price: {
    fontSize: sizeWidth(18),
    fontWeight: '500',
  },
  priceContainer: { flexDirection: 'row', gap: sizeWidth(5) },
});
