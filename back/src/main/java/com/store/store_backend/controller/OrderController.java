package com.store.store_backend.controller;

import com.store.store_backend.entity.Order;
import com.store.store_backend.service.OrderService;
import com.store.store_backend.entity.OrderItem;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    @PostMapping("/with-items")
    public ResponseEntity<Order> createOrderWithItems(
        @RequestBody Map<String, Object> request) {

        Order order = new Order();

        order.setUserId(
                Long.valueOf(request.get("userId").toString()));

        order.setTotalPrice(
                Long.valueOf(request.get("totalPrice").toString()));

        order.setStatus(
                request.get("status") != null
                        ? request.get("status").toString()
                        : "PENDING");

        List<Map<String, Object>> itemsData = (List<Map<String, Object>>) request.get("items");

        List<OrderItem> items = new java.util.ArrayList<>();

        for (Map<String, Object> itemData : itemsData) {

            OrderItem item = new OrderItem();

            item.setProductId(
                    Long.valueOf(itemData.get("productId").toString()));

            item.setProductName(
                    itemData.get("productName").toString());

            item.setPrice(
                    Long.valueOf(itemData.get("price").toString()));

            item.setQuantity(
                    Integer.valueOf(itemData.get("quantity").toString()));

            items.add(item);
        }

        return ResponseEntity.ok(
                orderService.createOrderWithItems(order, items));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long id) {

        Order order = orderService.getOrderById(id);

        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        try {
            Order order = orderService.updateStatus(id, status);

            if (order == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(order);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }
}