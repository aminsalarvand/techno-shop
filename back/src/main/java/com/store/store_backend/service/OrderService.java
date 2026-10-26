package com.store.store_backend.service;

import com.store.store_backend.entity.Order;
import com.store.store_backend.entity.OrderItem;
import com.store.store_backend.entity.Product;
import com.store.store_backend.repository.OrderRepository;
import com.store.store_backend.repository.OrderItemRepository;
import com.store.store_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order createOrder(Order order) {
        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("PENDING");
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order createOrderWithItems(
            Order order,
            List<OrderItem> items) {

        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("PENDING");
        }

        Order savedOrder = orderRepository.save(order);

        for (OrderItem item : items) {
            item.setOrderId(savedOrder.getId());
            orderItemRepository.save(item);
        }

        return savedOrder;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order updateStatus(Long id, String status) {

        Order order = orderRepository.findById(id).orElse(null);

        if (order == null) {
            return null;
        }

        if ("PAID".equals(status) && !"PAID".equals(order.getStatus())) {

            List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());

            for (OrderItem item : items) {

                Product product = productRepository.findById(item.getProductId()).orElse(null);

                if (product == null) {
                    throw new RuntimeException("محصول پیدا نشد");
                }

                if (product.getStock() < item.getQuantity()) {
                    throw new RuntimeException(
                            "موجودی محصول " + product.getName() + " کافی نیست");
                }
            }

            for (OrderItem item : items) {

                Product product = productRepository.findById(item.getProductId()).orElse(null);

                product.setStock(
                        product.getStock() - item.getQuantity());

                productRepository.save(product);
            }
        }

        order.setStatus(status);

        return orderRepository.save(order);
    }
}