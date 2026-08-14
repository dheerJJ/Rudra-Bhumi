export function MapEmbed({ className }: { className?: string }) {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7909.89092960369!2d75.70605804471982!3d26.94560240651012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4db6c575402b%3A0x7a2bc8997f8188e0!2sRudra%20Bhumi%20Realtors!5e1!3m2!1sen!2sin!4v1786715994725!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      title="Rudra Bhumi Realtors office location in Jhotwara, Jaipur"
      className={className}
    />
  );
}
