import { Card, Input, Button } from 'antd';
import { MailOutlined, PhoneOutlined, SendOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './contact.css';

const ContactUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900"
    >
      <Card className="w-full max-w-lg p-6 shadow-xl dark:bg-gray-800">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          Contact Us
        </h2>
        <Input className="mb-3" placeholder="Your Name" allowClear />
        <Input
          className="mb-3"
          placeholder="Your Email"
          allowClear
          prefix={<MailOutlined />}
        />
        <Input.TextArea
          className="mb-3"
          placeholder="Your Message"
          allowClear
          rows={4}
        />
        <Button type="primary" icon={<SendOutlined />} block>
          Send Message
        </Button>
        <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
          <p>
            <PhoneOutlined /> +91 98765 43210
          </p>
          <p>
            <MailOutlined /> contact@dessertshop.com
          </p>
        </div>
      </Card>
      <div className="mt-6 w-full max-w-lg">
        <iframe
          title="Google Map"
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509392!2d144.9630579155898!3d-37.81627974202137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f9f2f1%3A0xf4c3c07a26e3f6a0!2sDessert%20Shop!5e0!3m2!1sen!2sus!4v1615920123456"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </motion.div>
  );
};

export default ContactUs;
