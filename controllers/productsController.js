
import axios from "axios";

export const Products = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};
