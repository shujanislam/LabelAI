export default function Features() {
  return (
    <section id="features" className="py-28 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
        How LabelAI Works
      </h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Upload Text",
            desc: "Input plain text or documents easily to kickstart your labeling workflow.",
            icon: "📄",
          },
          {
            title: "Label with Prompts",
            desc: "Use custom prompts and AI suggestions to generate fast, accurate labels.",
            icon: "✨",
          },
          {
            title: "Export & Train",
            desc: "Download clean labeled data ready for training your machine learning models.",
            icon: "🚀",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="p-8 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
