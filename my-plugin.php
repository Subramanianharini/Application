<?php

function my_plugin_create_user($username, $email, $password) {
  global $wpdb;


  $existing_user = $wpdb->get_row("SELECT * FROM $wpdb->users WHERE user_email = '$email' OR user_login = '$username'");
  if ($existing_user) {
    return new WP_Error('user_exists', 'User already exists');
  }

  $user_data = array(
    'user_login' => $username,
    'user_email' => $email,
    'user_pass' => wp_hash_password($password),
  );
  $wpdb->insert($wpdb->users, $user_data);


  $token = wp_generate_password(12, false);
  $wpdb->insert($wpdb->prefix. 'tokens', array('user_id' => $wpdb->insert_id, 'token' => $token));

  return array('token' => $token);
}

function my_plugin_login_user($username, $password) {
  global $wpdb;

  $user = $wpdb->get_row("SELECT * FROM $wpdb->users WHERE user_login = '$username'");
  if (!$user) {
    return new WP_Error('invalid_username', 'Invalid username');
  }

 
  if (!wp_check_password($password, $user->user_pass)) {
    return new WP_Error('invalid_password', 'Invalid password');
  }

  $token = wp_generate_password(12, false);
  $wpdb->update($wpdb->prefix. 'tokens', array('token' => $token), array('user_id' => $user->ID));

  return array('token' => $token);
}

function my_plugin_get_user($token) {
  global $wpdb;

  $token_row = $wpdb->get_row("SELECT * FROM $wpdb->prefix. 'tokens' WHERE token = '$token'");
  if (!$token_row) {
    return new WP_Error('invalid_token', 'Invalid token');
  }


  $user = $wpdb->get_row("SELECT * FROM $wpdb->users WHERE ID = '$token_row->user_id'");

  return array('username' => $user->user_login, 'email' => $user->user_email);
}
add_action('rest_api_init', function () {
  register_rest_route('my-plugin/v1', 'ignup', array(
    'ethods' => 'POST',
    'callback' => 'y_plugin_create_user',
  ));
  register_rest_route('my-plugin/v1', 'login', array(
    'ethods' => 'POST',
    'callback' => 'y_plugin_login_user',
  ));
  register_rest_route('my-plugin/v1', 'user', array(
    'ethods' => 'GET',
    'callback' => 'y_plugin_get_user',
  ));
});