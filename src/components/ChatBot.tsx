
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2,
  Maximize2,
  Star,
  Clock
} from 'lucide-react';
import { Course, mockCourses } from '@/data/mockData';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  courses?: Course[];
}

interface ChatBotProps {
  onViewCourse: (course: Course) => void;
  onAddToViewHistory: (course: Course) => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onViewCourse, onAddToViewHistory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Xin chào! Tôi là AI Assistant của EduMarket. Tôi có thể giúp bạn tìm kiếm khóa học phù hợp. Hãy cho tôi biết bạn muốn học gì nhé! 📚',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getAIResponse = (userMessage: string): { content: string; courses?: Course[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Define keywords and corresponding responses
    const responses = [
      {
        keywords: ['tiếng anh', 'english', 'nói tiếng anh', 'giao tiếp'],
        response: 'Tuyệt vời! Tôi tìm thấy một số khóa học tiếng Anh chất lượng cao cho bạn:',
        courses: mockCourses.filter(course => 
          course.category === 'Language Learning' && course.title.toLowerCase().includes('english')
        )
      },
      {
        keywords: ['lập trình', 'programming', 'react', 'typescript', 'code'],
        response: 'Rất tốt! Đây là những khóa học lập trình được đánh giá cao:',
        courses: mockCourses.filter(course => 
          course.category === 'Programming' || course.skills.some(skill => 
            ['React', 'TypeScript', 'Python'].includes(skill)
          )
        )
      },
      {
        keywords: ['marketing', 'digital marketing', 'quảng cáo', 'bán hàng'],
        response: 'Marketing là lĩnh vực rất hot hiện nay! Tôi gợi ý những khóa học này:',
        courses: mockCourses.filter(course => course.category === 'Marketing')
      },
      {
        keywords: ['thiết kế', 'design', 'ui', 'ux', 'đồ họa'],
        response: 'Thiết kế là một kỹ năng tuyệt vời! Đây là những khóa học design phù hợp:',
        courses: mockCourses.filter(course => course.category === 'Design')
      },
      {
        keywords: ['data science', 'machine learning', 'dữ liệu', 'ai', 'python'],
        response: 'Data Science là tương lai! Tôi tìm thấy những khóa học tuyệt vời này:',
        courses: mockCourses.filter(course => 
          course.category === 'Data Science' || course.skills.includes('Python')
        )
      },
      {
        keywords: ['nhiếp ảnh', 'photography', 'chụp ảnh', 'photo'],
        response: 'Nhiếp ảnh là nghệ thuật tuyệt đẹp! Khóa học này sẽ giúp bạn:',
        courses: mockCourses.filter(course => course.category === 'Creative Arts')
      },
      {
        keywords: ['tiếng nhật', 'japanese', 'jlpt', 'nhật bản'],
        response: 'Tiếng Nhật rất thú vị! Tôi có khóa học phù hợp cho người mới bắt đầu:',
        courses: mockCourses.filter(course => 
          course.title.toLowerCase().includes('japanese') || course.title.toLowerCase().includes('nhật')
        )
      },
      {
        keywords: ['business', 'kinh doanh', 'quản lý', 'dự án'],
        response: 'Kỹ năng kinh doanh rất quan trọng! Đây là những khóa học tôi gợi ý:',
        courses: mockCourses.filter(course => course.category === 'Business')
      }
    ];

    // Find matching response
    for (const response of responses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return {
          content: response.response,
          courses: response.courses
        };
      }
    }

    // Default responses for common queries
    if (lowerMessage.includes('giá') || lowerMessage.includes('bao nhiêu')) {
      return {
        content: 'Các khóa học trên nền tảng có mức giá đa dạng từ 500K đến 2 triệu VNĐ. Bạn có thể sử dụng bộ lọc giá để tìm khóa học phù hợp với ngân sách. Bạn đang tìm khóa học trong tầm giá nào? 💰'
      };
    }

    if (lowerMessage.includes('chứng chỉ') || lowerMessage.includes('certificate')) {
      return {
        content: 'Hầu hết các khóa học đều cấp chứng chỉ hoàn thành được công nhận. Bạn có thể xem thông tin chứng chỉ trong phần chi tiết khóa học. Bạn đang quan tâm đến lĩnh vực nào? 🏆'
      };
    }

    if (lowerMessage.includes('thời gian') || lowerMessage.includes('bao lâu')) {
      return {
        content: 'Thời gian học tùy thuộc vào từng khóa học, thường từ 8-20 tuần. Bạn có thể học theo tốc độ của mình với các video bài giảng có thể xem lại nhiều lần. Bạn muốn tìm khóa học ngắn hạn hay dài hạn? ⏰'
      };
    }

    // Default response
    return {
      content: 'Tôi hiểu bạn đang tìm kiếm khóa học! Để tôi có thể gợi ý chính xác hơn, bạn có thể cho tôi biết:\n\n• Bạn muốn học lĩnh vực gì? (tiếng Anh, lập trình, marketing, thiết kế...)\n• Mức độ của bạn? (mới bắt đầu, trung cấp, nâng cao)\n• Ngân sách mong muốn?\n\nVí dụ: "Tôi muốn học tiếng Anh giao tiếp" hoặc "Tôi cần học lập trình React" 🤖',
      courses: mockCourses.slice(0, 3) // Show some popular courses
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        courses: aiResponse.courses
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleCourseClick = (course: Course) => {
    onAddToViewHistory(course);
    onViewCourse(course);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 w-96 shadow-2xl z-50 transition-all duration-300 ${
          isMinimized ? 'h-16' : 'h-[600px]'
        }`}>
          {/* Header */}
          <CardHeader className="p-4 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5" />
                AI Learning Assistant
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-blue-700"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {!isMinimized && (
              <p className="text-sm text-blue-100">
                Tìm khóa học phù hợp với bạn 🎯
              </p>
            )}
          </CardHeader>

          {!isMinimized && (
            <>
              {/* Messages */}
              <CardContent className="p-0 h-96 overflow-y-auto custom-scrollbar">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
                    >
                      {message.type === 'bot' && (
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white ml-auto'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        
                        {message.courses && message.courses.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.courses.map((course) => (
                              <div
                                key={course.id}
                                onClick={() => handleCourseClick(course)}
                                className="p-3 bg-white border rounded-lg hover:shadow-md cursor-pointer transition-shadow"
                              >
                                <div className="flex gap-3">
                                  <img
                                    src={course.image}
                                    alt={course.title}
                                    className="h-12 w-16 object-cover rounded"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-gray-900 truncate">
                                      {course.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-1">{course.instructor}</p>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        {course.rating}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {course.duration}
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="font-semibold text-sm text-blue-600">
                                        {formatPrice(course.price)}
                                      </span>
                                      <Badge variant="secondary" className="text-xs">
                                        {course.level}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-500 mt-1">
                          {message.timestamp.toLocaleTimeString('vi-VN', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>

                      {message.type === 'user' && (
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};
